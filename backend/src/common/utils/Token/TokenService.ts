import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';


import { User } from '../../../DB/models/user.model'; // Import directly
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { RefreshTokenRepository } from '../../../DB/repository/refreshToken.repository';

interface Credential {
  user: User;
  decoded: JwtPayload;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepo: RefreshTokenRepository,
  ) {}

  async generateTokens(user: User) {
    const jti = randomUUID();

    const accessToken = await this.jwtService.signAsync(
      { userId: user.id, email: user.email, role: user.role },
      { secret: process.env.ACCESS_TOKEN_SECRET, expiresIn: '15m' },
    );

    const refreshToken = await this.jwtService.signAsync(
      { userId: user.id, jti },
      { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' },
    );

    await this.refreshTokenRepo.create({
      jti,
      user,
      expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      revoked: false,
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async revokeRefreshToken(jti: string) {
    await this.refreshTokenRepo.update({ jti }, { revoked: true });
  }
}
