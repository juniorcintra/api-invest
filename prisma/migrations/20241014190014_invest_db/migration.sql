/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "nome" TEXT;

-- CreateTable
CREATE TABLE "empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "setor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acoes" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "valorAtual" DOUBLE PRECISION NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "acoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carteira" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ativo" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valorMedio" DOUBLE PRECISION NOT NULL,
    "carteiraId" INTEGER NOT NULL,
    "acaoId" INTEGER NOT NULL,

    CONSTRAINT "ativo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresa_nome_key" ON "empresa"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "empresa_cnpj_key" ON "empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "acoes_ticker_key" ON "acoes"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "acoes" ADD CONSTRAINT "acoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ativo" ADD CONSTRAINT "ativo_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ativo" ADD CONSTRAINT "ativo_acaoId_fkey" FOREIGN KEY ("acaoId") REFERENCES "acoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
