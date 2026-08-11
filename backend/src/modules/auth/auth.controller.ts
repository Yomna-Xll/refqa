// src/moduls/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { GoogleSignInDto, SignUpDto } from './DTO/Signup.dto';
import { OtpVerifyDto } from './DTO/otpvertfcation.dto';
import { LoginDto } from './DTO/login.dto';
import { ForgetPasswordDto } from './DTO/forgetpassword.dto';
import { ResetPasswordDto } from './DTO/resetpassword.dto';


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

@Post('google')
@ApiOperation({ summary: 'Sign up or sign in with Google' })
@ApiResponse({ status: 200, description: 'Authenticated successfully, returns tokens' })
@ApiResponse({ status: 401, description: 'Invalid Google token' })
googleAuth(@Body() body: GoogleSignInDto) {
  return this.authService.googleAuth(body);
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


@Post('forget-password')
@ApiOperation({ summary: 'Request a password reset code via email' })
@ApiResponse({ status: 200, description: 'Reset code sent if the email exists' })
forgetPassword(@Body() body: ForgetPasswordDto) {
  return this.authService.forgetPassword(body);
}
@Post('verify-reset-otp')
@ApiOperation({ summary: 'Verify OTP for password reset and get a reset token' })
@ApiResponse({
  status: 200,
  description: 'OTP verified, returns a short-lived reset token',
  schema: {
    example: { message: 'OTP verified', resetToken: 'eyJhbGciOiJIUzI1NiIs...' },
  },
})
@ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
verifyResetOtp(@Body() body: OtpVerifyDto) {
  return this.authService.verifyResetOtp(body);
}

@Post('reset-password')
@ApiOperation({ summary: 'Reset password using the OTP code' })
@ApiResponse({ status: 200, description: 'Password reset successfully' })
@ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
resetPassword(@Body() body: ResetPasswordDto) {
  return this.authService.resetPassword(body);
}


}