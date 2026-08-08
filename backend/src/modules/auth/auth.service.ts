import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './DTO/Signup.dto';
import { UserRepository } from '../../DB/repository/user.repository';
import { genreteHash } from '../../common/utils/Hash';
import { OtpEnum } from '../../common/enums/otp.enums';
import { OtpService } from '../email/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly otpService: OtpService,
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
}