import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class EmpresaDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  setor: string;
}

class AcoesDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsNumber()
  @IsNotEmpty()
  valorAtual: number;

  @ValidateNested()
  @Type(() => EmpresaDto)
  empresa: EmpresaDto;
}

class AtivoDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  quantidade: number;

  @IsNumber()
  @IsNotEmpty()
  valorMedio: number;

  @IsInt()
  @IsNotEmpty()
  carteiraId: number;

  @IsInt()
  @IsNotEmpty()
  acaoId: number;

  @ValidateNested()
  @Type(() => AcoesDto)
  acao: AcoesDto;
}

export class UpdateWalletDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AtivoDto)
  @IsArray()
  ativos?: AtivoDto[];

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
