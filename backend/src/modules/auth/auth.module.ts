import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../DB/models/user.model';
import { Otp } from '../../DB/models/otp.model';
import { EmailModule } from '../email/email.module';
import { OtpService } from '../email/otp.service';
import { UserRepository } from '../../DB/repository/user.repository';
import { OtpRepository } from '../../DB/repository/otp.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp]), EmailModule],
  providers: [AuthService, OtpService,UserRepository,OtpRepository],
  controllers: [AuthController],
})
export class AuthModule {}
 