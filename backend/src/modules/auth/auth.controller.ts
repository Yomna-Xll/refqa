// src/moduls/auth/auth.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './DTO/Signup.dto';


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
}