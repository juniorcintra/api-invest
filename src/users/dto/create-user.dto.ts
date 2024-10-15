import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsBoolean,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  login?: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 14) // CPF pode ter 11 dígitos (sem pontuação) ou 14 (com pontuação)
  cpf: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;

  // Campos gerados automaticamente, não precisam ser incluídos no DTO de criação
  createdAt?: Date;
  updatedAt?: Date;
}
