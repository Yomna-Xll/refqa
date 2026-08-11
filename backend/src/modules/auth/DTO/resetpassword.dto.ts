// DTO/reset-password.dto.ts

import { IsEmail, Length, MinLength, Matches, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from '../../../common/decorators/math.decorators';

export class ResetPasswordDto {

@ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: 'Token received from /auth/verify-reset-otp',
  })
  @IsNotEmpty()
  resetToken: string;

  @ApiProperty({ example: 'NewPassw0rd!' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
  newPassword: string;

  @ApiProperty({ example: 'NewPassw0rd!' })
  @IsNotEmpty()
  @Match('newPassword', { message: 'Passwords do not match' })
  confirmPassword: string;
}