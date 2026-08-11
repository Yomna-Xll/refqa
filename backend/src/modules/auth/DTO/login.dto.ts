import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'ahmed@university.edu' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Passw0rd!' })
  @IsNotEmpty()
  password: string;
}