import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateAtivoDto {
  @IsString()
  @IsNotEmpty()
  ticker: string;

  @IsInt()
  @IsNotEmpty()
  quantidade: number;

  @IsNotEmpty()
  valorMedio: number;
}

export class CreateWalletDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateAtivoDto)
  @ArrayMinSize(1, { message: 'A carteira deve conter ao menos um ativo.' })
  @IsOptional()
  ativos?: CreateAtivoDto[];
}
