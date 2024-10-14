import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Lendo dados do JSON...');
  const data = JSON.parse(fs.readFileSync('prisma/data.json', 'utf-8'));

  // Inserir empresas e ações
  for (const empresaData of data.empresas) {
    const { nome, cnpj, setor, acoes } = empresaData;
    const empresa = await prisma.empresa.create({
      data: {
        nome,
        cnpj,
        setor,
        acoes: {
          create: acoes,
        },
      },
    });
    console.log(`Empresa criada: ${empresa.nome}`);
  }

  // Inserir usuários, carteiras e ativos
  for (const usuarioData of data.usuarios) {
    const { login, nome, cpf, senha, email, carteiras } = usuarioData;
    const usuario = await prisma.user.create({
      data: {
        login,
        nome,
        cpf,
        senha,
        email,
        carteiras: {
          create: carteiras.map((carteira) => ({
            nome: carteira.nome,
            ativos: {
              create: carteira.ativos.map((ativo) => ({
                quantidade: ativo.quantidade,
                valorMedio: ativo.valorMedio,
                acao: {
                  connect: { ticker: ativo.ticker },
                },
              })),
            },
          })),
        },
      },
    });
    console.log(`Usuário criado: ${usuario.nome}`);
  }

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
