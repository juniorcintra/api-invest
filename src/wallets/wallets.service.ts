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

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
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

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
