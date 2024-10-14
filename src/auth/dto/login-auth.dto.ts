import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Nome de usuário ou email para login',
    example: 'usuario@example.com',
  })
  @IsNotEmpty({ message: 'O campo login não pode estar vazio' })
  @IsString({ message: 'O campo login deve ser uma string' })
  login: string;

  @ApiProperty({
    description: 'Senha para autenticação',
    example: 'senhaSegura123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'O campo senha não pode estar vazio' })
  @IsString({ message: 'O campo senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  senha: string;
}
