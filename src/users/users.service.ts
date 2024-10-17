import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { login, nome, cpf, senha, email } = createUserDto;

    const encryptedPassword = await hash(senha, 10);

    const existingUser = await this.prisma.user.findUnique({
      where: { login },
    });

    if (existingUser) {
      throw new Error('Login já existe');
    }

    const existingCpf = await this.prisma.user.findUnique({
      where: { cpf },
    });

    if (existingCpf) {
      throw new Error('CPF já existe');
    }

    return this.prisma.user.create({
      data: {
        login,
        nome,
        cpf,
        senha: encryptedPassword,
        email,
      },
    });
  }
}
