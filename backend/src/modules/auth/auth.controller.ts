// src/moduls/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './DTO/Signup.dto';
import { OtpVerifyDto } from './DTO/otpvertfcation.dto';
import { LoginDto } from './DTO/login.dto';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new student account' })
  @ApiResponse({ status: 201, description: 'Account created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  addUser(@Body() body: SignUpDto) {
    return this.authService.addUser(body);
  }

@Post('verify-otp')
@ApiOperation({ summary: 'Verify email using the OTP code' })
@ApiResponse({ status: 200, description: 'Email verified successfully' })
@ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
verifyOtp(@Body() body: OtpVerifyDto) {
  return this.authService.verifyOtp(body);
}

@Post('login')
@ApiOperation({ summary: 'Login with email and password' })
@ApiResponse({ status: 200, description: 'Login successful, returns access token' })
@ApiResponse({ status: 401, description: 'Invalid email or password' })
login(@Body() body: LoginDto) {
  return this.authService.login(body);
}


}