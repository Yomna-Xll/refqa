// src/moduls/auth/DTO/otp-verify.dto.ts

import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OtpVerifyDto {
  @ApiProperty({ example: 'ahmed@university.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456' })
  @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
  otp: string;
}