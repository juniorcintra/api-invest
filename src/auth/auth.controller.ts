import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/login-auth.dto';
import { Public } from 'src/utils/metadata';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    type: AuthLoginDto,
    description: 'Objeto de Autenticação',
  })
  @HttpCode(HttpStatus.OK)
  @Public() // não precisa de token
  @Post('login')
  async login(@Body() authlogindto: AuthLoginDto) {
    return this.authService.login(authlogindto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Public() // Endpoint público
  async refresh(@Body('refresh_token') refresh_token: string) {
    return this.authService.refreshAccessToken(refresh_token);
  }
}
