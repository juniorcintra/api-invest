import {
  Injectable,
  UnauthorizedException,
  type OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { AuthLoginDto } from './dto/login-auth.dto';
import { PrismaService } from 'src/database/prisma.service';
import { ModuleRef } from '@nestjs/core';
import { compare } from 'bcryptjs';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService implements OnModuleInit {
  private prisma: PrismaService;
  private jwtService: JwtService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.prisma = this.moduleRef.get(PrismaService, { strict: false });
    this.jwtService = this.moduleRef.get(JwtService, { strict: false });
  }

  async validateUser(login: string, pass: string): Promise<any> {
    const userLogin = await this.prisma.user.findUnique({
      where: { login },
    });
    const userEmail = await this.prisma.user.findUnique({
      where: { email: login },
    });

    const user = userLogin || userEmail;

    if (user) {
      const encryptedPassword = await compare(pass, user.senha);
      if (encryptedPassword) {
        return user;
      } else {
        throw new UnauthorizedException(
          'Usuário e/ou senha incorretos, verifique os dados digitados e tente novamente.',
        );
      }
    } else {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  }

  async login(user: AuthLoginDto) {
    const payload = { login: user.login, senha: user.senha };

    const userValidate = await this.validateUser(payload.login, payload.senha);

    if (!userValidate) {
      throw new UnauthorizedException();
    }

    const access_token = this.jwtService.sign(payload, { expiresIn: '1d' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    delete userValidate.senha;

    return {
      ...userValidate,
      access_token,
      refresh_token,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const foundToken = await this.prisma.blackListToken.findFirst({
        where: {
          refresh_token: refreshToken,
        },
      });

      if (foundToken) {
        return {
          message: 'Refresh token already used',
          code: 'invalid_refresh_token',
        };
      }

      await this.prisma.blackListToken.create({
        data: {
          refresh_token: refreshToken,
        },
      });

      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.secret,
      });

      const newAccessToken = this.jwtService.sign(
        { login: payload.login },
        { expiresIn: '1d' },
      );

      const newRefreshToken = this.jwtService.sign(
        { login: payload.login },
        { expiresIn: '7d' },
      );

      return { access_token: newAccessToken, refresh_token: newRefreshToken };
    } catch (e) {
      console.log('🚀 ~ e:', e);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
