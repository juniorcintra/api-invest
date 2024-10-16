import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWalletDto: CreateWalletDto) {
    const { nome, userId, ativos = [] } = createWalletDto;

    // Cria a carteira com os ativos
    return this.prisma.carteira.create({
      data: {
        nome,
        userId,
        ativos: {
          create: ativos.map((ativo) => ({
            quantidade: ativo.quantidade,
            valorMedio: ativo.valorMedio,
            acao: {
              connect: { ticker: ativo.ticker },
            },
          })),
        },
      },
      include: { ativos: true },
    });
  }

  async findAllByUser(id: number) {
    return this.prisma.carteira.findMany({
      where: { userId: id },
      include: {
        ativos: { include: { acao: { include: { empresa: true } } } },
      },
    });
  }

  async getActions() {
    return await this.prisma.acoes.findMany({ include: { empresa: true } });
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    const { nome, ativos = [] } = updateWalletDto;

    return this.prisma.carteira.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        ativos: {
          deleteMany: {},
          create: ativos.map((ativo) => ({
            quantidade: ativo.quantidade,
            valorMedio: ativo.valorMedio,
            acao: {
              connect: { ticker: ativo?.acao.ticker },
            },
          })),
        },
      },
      include: { ativos: true },
    });
  }

  async remove(id: number) {
    return await this.prisma.carteira.delete({ where: { id: Number(id) } });
  }
}
