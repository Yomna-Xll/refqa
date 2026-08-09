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
import { TokenService } from '../../common/utils/Token';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenRepository } from '../../DB/repository/refreshToken.repository';
import { RefreshToken } from '../../DB/models/RefreshToken.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Otp,RefreshToken]), EmailModule],
  providers: [AuthService, OtpService,UserRepository,OtpRepository,TokenService,JwtService,RefreshTokenRepository],
  controllers: [AuthController],
})
export class AuthModule {}
 