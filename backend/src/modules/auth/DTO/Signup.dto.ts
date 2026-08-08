import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'ahmed@university.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Ahmed Mohamed' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description: 'At least 8 characters, with uppercase, lowercase, and a number or symbol',
  })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number or special character',
  })
  password: string;
}