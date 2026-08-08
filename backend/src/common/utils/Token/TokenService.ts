// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';

// import { UserRepository } from '../../../DB/repository/user.repo';
// import { TokenRepository } from '../../../DB/repository/token.repo'; // Import directly
// import { User } from '../../../DB/models/user.model'; // Import directly
// import { v4 as uuidv4 } from 'uuid';
// import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
// import { JwtPayload } from 'jsonwebtoken';
// import { randomUUID } from 'crypto';
// import { RoleEnums, SignatureLevelEnum, TokenEnum } from '../../enums';

// interface Credential {
//   user: User;
//   decoded: JwtPayload;
// }

// @Injectable()
// export class TokenService {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly userReposatory: UserRepository,
//     private readonly tokenReposatory: TokenRepository,
//   ) {}

//   GenerateToken = async ({
//     Payload,
//     options,
//   }: {
//     Payload: object;
//     options: JwtSignOptions;
//   }): Promise<string> => {
//     return this.jwtService.signAsync(Payload, options);
//   };

//   createToken = async ({
//     payload,
//     options,
//   }: {
//     payload: object;
//     options?: JwtSignOptions;
//   }): Promise<string> => {
//     return this.jwtService.signAsync(payload, options);
//   };
//   async generateTempToken(user: User): Promise<string> {
//     const jwtid = uuidv4();

//     return this.createToken({
//       payload: {
//         userId: user.id,
//         email: user.email,
//         is_temp: true,
//       },
//       options: {
//         secret: process.env.TEMP_TOKEN_SECRET!,
//         expiresIn: '1h',
//         jwtid,
//       },
//     });
//   }

//   VerifyToken = async ({
//     token,
//     options = {
//       secret: process.env.ACCESS_TOKENUSER as string,
//     },
//   }: {
//     token: string;
//     options?: JwtVerifyOptions;
//   }): Promise<JwtPayload> => {
//     return this.jwtService.verifyAsync(token, options);
//   };

//   verifyToken = async ({
//     token,
//     signature,
//     options,
//   }: {
//     token: string;
//     signature: string;
//     options?: JwtVerifyOptions;
//   }): Promise<JwtPayload> => {
//     return this.jwtService.verifyAsync(token, {
//       ...options,
//       secret: signature,
//     });
//   };

//   GetSignatureslevel = (role: RoleEnums): SignatureLevelEnum => {
//     return role === RoleEnums.ADMIN
//       ? SignatureLevelEnum.System
//       : SignatureLevelEnum.Bearer;
//   };

//   GetTokenKeys = (
//     Signatures: SignatureLevelEnum,
//   ): { Acess_key: string; refresh_key: string } => {
//     if (Signatures === SignatureLevelEnum.System) {
//       return {
//         Acess_key: process.env.ACCESS_TOKENADMIN as string,
//         refresh_key: process.env.REFRESH_TOKENADMIN as string,
//       };
//     }

//     return {
//       Acess_key: process.env.ACCESS_TOKENUSER as string,
//       refresh_key: process.env.REFRESH_TOKENUSER as string,
//     };
//   };

//   GenerateCredentials = async (User: User) => {
//     const Signature = this.GetSignatureslevel(User.role);
//     const TokenSecretKey = this.GetTokenKeys(Signature);
//     const jwtid = randomUUID();

//     const AcessToken = await this.GenerateToken({
//       Payload: { userId: User.id, email: User.email },
//       options: {
//         secret: TokenSecretKey.Acess_key,
//         expiresIn: '1h',
//         jwtid,
//       },
//     });

//     const refreshToken = await this.GenerateToken({
//       Payload: { userId: User.id, email: User.email },
//       options: {
//         secret: TokenSecretKey.refresh_key,
//         expiresIn: '7d',
//         jwtid,
//       },
//     });

//     return { AcessToken, refreshToken };
//   };

//   Decoded = async ({
//     Authorization,
//     TokenType,
//   }: {
//     Authorization: string;
//     TokenType: TokenEnum;
//   }): Promise<Credential> => {
//     const [Bearer, token] = Authorization.split(' ');

//     if (!Bearer || !token) {
//       throw new UnauthorizedException('Missing Token Parts');
//     }

//     const secrets =
//       TokenType === TokenEnum.AcessToken
//         ? [
//             process.env.ACCESS_TOKENADMIN as string,
//             process.env.ACCESS_TOKENUSER as string,
//           ]
//         : [
//             process.env.REFRESH_TOKENADMIN as string,
//             process.env.REFRESH_TOKENUSER as string,
//           ];

//     let decoded: JwtPayload | null = null;

//     for (const secret of secrets) {
//       try {
//         decoded = await this.VerifyToken({ token, options: { secret } });
//         break;
//       } catch {
//         continue;
//       }
//     }

//     if (!decoded) {
//       throw new UnauthorizedException('Invalid or expired token');
//     }

//     if (!decoded.iat || !decoded.userId) {
//       throw new BadRequestException('Invalid token payload');
//     }

//     if (
//       decoded.jti &&
//       (await this.tokenReposatory.findOne({ jti: decoded.jti }))
//     ) {
//       throw new UnauthorizedException('Invalid or old login credentials');
//     }

//     const user = await this.userReposatory.findOne({
//       id: Number(decoded.userId),
//     });

//     if (!user) {
//       throw new NotFoundException('Account not found');
//     }

//     return { user, decoded };
//   };

//   createRevokeToken = async (decoded: JwtPayload) => {
//     if (!decoded.jti || !decoded.exp) {
//       throw new BadRequestException('invalid token payload');
//     }

//     const token = await this.tokenReposatory.create({
//       jti: decoded.jti,
//       ExpiredAt: new Date(decoded.exp * 1000),
//     });

//     if (!token) {
//       throw new BadRequestException('failed to revoke this token ');
//     }

//     return token;
//   };
// }
