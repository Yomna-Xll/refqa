import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './DTO/Signup.dto';
import { UserRepository } from '../../DB/repository/user.repository';
import { compareHash, genreteHash } from '../../common/utils/Hash';
import { OtpEnum } from '../../common/enums/otp.enums';
import { OtpService } from '../email/otp.service';
import { OtpVerifyDto } from './DTO/otpvertfcation.dto';
import { OtpRepository } from '../../DB/repository/otp.repository';
import { OnboardingStage } from '../../common/enums/user.enum';
import { LoginDto } from './DTO/login.dto';
import { TokenService } from '../../common/utils/Token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly otpService: OtpService,
    private readonly otpRepo: OtpRepository,
    private readonly tokenService: TokenService,
  ) {}

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

  const isMatch = await compareHash(password, user.passwordHash);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid email or password');
  }

  const tokens = await this.tokenService.generateTokens(user);

  return { message: 'Login successful', tokens };
}

}