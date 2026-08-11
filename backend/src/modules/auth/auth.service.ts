import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleSignInDto, SignUpDto } from './DTO/Signup.dto';
import { UserRepository } from '../../DB/repository/user.repository';
import { compareHash, genreteHash } from '../../common/utils/Hash';
import { OtpEnum } from '../../common/enums/otp.enums';
import { OtpService } from '../email/otp.service';
import { OtpVerifyDto } from './DTO/otpvertfcation.dto';
import { OtpRepository } from '../../DB/repository/otp.repository';
import { OnboardingStage } from '../../common/enums/user.enum';
import { LoginDto } from './DTO/login.dto';
import { TokenService } from '../../common/utils/Token';
import { OAuth2Client } from 'google-auth-library';
import { OauthAccountRepository } from '../../DB/repository/oauth-account.repository';
import { ForgetPasswordDto } from './DTO/forgetpassword.dto';
import { ResetPasswordDto } from './DTO/resetpassword.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly googleClient: OAuth2Client;
  constructor(
    private readonly userRepo: UserRepository,
     private readonly oauthRepo: OauthAccountRepository,
    private readonly otpService: OtpService,
    private readonly otpRepo: OtpRepository,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
  ) {
    this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async addUser(body: SignUpDto) {
    const { email, fullName, password } = body;

    const existingUser = await this.userRepo.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await genreteHash(password);

    const user = await this.userRepo.create({
      fullName,
      email,
      passwordHash,
    });

    await this.otpService.generateAndSend(user, OtpEnum.confirmEmail);

    return {
      message: 'Account created. Please check your email for the verification code.',
      userId: user.id,
    };
  }
async googleAuth(body: GoogleSignInDto) {
    const { idToken } = body;
const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    }).catch(() => {
      throw new UnauthorizedException('Invalid Google token');
    });
      const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      throw new UnauthorizedException('Invalid Google token payload');
    }

    const { sub: googleId, email, name } = payload;
     const existingOauth = await this.oauthRepo.findOneWithOptions({
      where: { providerUserId: googleId },
      relations: { user: true },
    });

    if (existingOauth) {
      return this.tokenService.generateTokens(existingOauth.user);
    }

    let user = await this.userRepo.findOne({ email });

    if (!user) {
      user = await this.userRepo.create({
        email,
        fullName: name || email.split('@')[0],
        passwordHash: null,
        emailVerified: true
      });
    }
    await this.oauthRepo.create({
      provider: 'google',
      providerUserId: googleId,
      user,
    });

    return this.tokenService.generateTokens(user);
  }

 
async verifyOtp(body: OtpVerifyDto) {
  const { email, otp } = body;

  const user = await this.userRepo.findOne({ email });
  if (!user) {
    throw new BadRequestException('User not found');
  }

  await this.otpService.verify(user.id, otp, OtpEnum.confirmEmail);

  await this.userRepo.update(
    { id: user.id },
    { emailVerified: true, onboardingStage: OnboardingStage.LINE_SELECTED },
  );

  return { message: 'Email verified successfully' };
}
async login(body: LoginDto) {
  const { email, password } = body;

  const user = await this.userRepo.findOne({ email });
  if (!user) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const isMatch = await compareHash(password, user.passwordHash as unknown as string);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const tokens = await this.tokenService.generateTokens(user);

  return { message: 'Login successful', tokens };
}
async forgetPassword(body: ForgetPasswordDto) {
  const { email } = body;

  const user = await this.userRepo.findOne({ email });
  if (!user) {
    return { message: 'If this email exists, a reset code has been sent.' };
  }
  await this.otpService.generateAndSend(user, OtpEnum.ResetPassword);

  return { message: 'If this email exists, a reset code has been sent.' };
}
async verifyResetOtp(body: OtpVerifyDto) {
  const { email, otp } = body;

  const user = await this.userRepo.findOne({ email });
  if (!user) {
    throw new BadRequestException('User not found');
  }

  const verifiedOtp = await this.otpService.verifyAndReturn(user.id, otp, OtpEnum.ResetPassword);

  const resetToken = await this.jwtService.signAsync(
    { userId: user.id, otpId: verifiedOtp.id, purpose: 'password_reset' },
    { secret: process.env.RESET_TOKEN_SECRET, expiresIn: '10m' },
  );

  return { message: 'OTP verified', resetToken };
}
async resetPassword(body: ResetPasswordDto) {
  const { resetToken, newPassword } = body;

  let payload: any;
  try {
    payload = await this.jwtService.verifyAsync(resetToken, {
      secret: process.env.RESET_TOKEN_SECRET,
    });
  } catch {
    throw new UnauthorizedException('Invalid or expired reset token');
  }

  const otpRecord = await this.otpRepo.findOne({ id: payload.otpId });
  if (!otpRecord || otpRecord.resetTokenUsed) {
    throw new UnauthorizedException('This reset token has already been used');
  }

  const user = await this.userRepo.findOne({ id: payload.userId });
  if (!user) {
    throw new BadRequestException('User not found');
  }

  user.passwordHash = await genreteHash(newPassword);
  await this.userRepo.save(user);

  otpRecord.resetTokenUsed = true;
  await this.otpRepo.save(otpRecord);

  return { message: 'Password reset successfully' };
}
}