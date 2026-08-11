// src/moduls/auth/otp.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomInt } from 'crypto';
import { EmailService } from '../email/email.service';
import { OtpEnum } from '../../common/enums/otp.enums';
import { User } from '../../DB/models/user.model';
import { OtpRepository } from '../../DB/repository/otp.repository';
import { compareHash, genreteHash } from '../../common/utils/Hash';
import { Otp } from '../../DB/models/otp.model';

@Injectable()
export class OtpService {
  constructor(
     private readonly otpRepo: OtpRepository,
    private readonly emailService: EmailService,
  ) {}

  async generateAndSend(user: User, type: OtpEnum = OtpEnum.confirmEmail) {
    const expirationMinutes = Number(process.env.OTP_EXPIRATION_MINUTES ?? 5);
    if (Number.isNaN(expirationMinutes) || expirationMinutes <= 0) {
      throw new BadRequestException('Invalid OTP_EXPIRATION_MINUTES value');
    }

    await this.otpRepo.update(
      { user: { id: user.id }, type, isUsed: false },
      { isUsed: true },
    );

    const rawCode = randomInt(100000, 999999).toString();
    const hashedCode = await genreteHash(rawCode);

    const otp = await this.otpRepo.create({
      code: hashedCode,
      type,
      isUsed: false,
      expiredAt: new Date(Date.now() + expirationMinutes * 60 * 1000),
      user,
    });
    await this.otpRepo.save(otp);

    await this.emailService.sendOtpEmail(user.email, rawCode);
  }

 async verify(userId: string, code: string, type: OtpEnum): Promise<boolean> {
  const otp = await this.otpRepo.findOneWithOptions({
    where: { user: { id: userId }, type, isUsed: false },
    order: { createdAt: 'DESC' },
    relations: {user:true},
  });

  if (!otp) {
    throw new BadRequestException('No active OTP found, please request a new one');
  }

  if (otp.expiredAt < new Date()) {
    throw new BadRequestException('OTP has expired, please request a new one');
  }

  const isMatch = await compareHash(code, otp.code);
  if (!isMatch) {
    throw new BadRequestException('Invalid OTP code');
  }

  otp.isUsed = true;
  await this.otpRepo.save(otp);   

  return true;
}
async verifyAndReturn(userId: string, code: string, type: OtpEnum): Promise<Otp> {
   const otp = await this.otpRepo.findOneWithOptions({
    where: { user: { id: userId }, type, isUsed: false },
    order: { createdAt: 'DESC' },
    relations: {user:true},
  });

  if (!otp) {
    throw new BadRequestException('No active OTP found, please request a new one');
  }

  if (otp.expiredAt < new Date()) {
    throw new BadRequestException('OTP has expired, please request a new one');
  }

  const isMatch = await compareHash(code, otp.code);
  if (!isMatch) {
    throw new BadRequestException('Invalid OTP code');
  }

  otp.isUsed = true;
  await this.otpRepo.save(otp);   
  return this.otpRepo.save(otp);   // بدل return true;
}
}