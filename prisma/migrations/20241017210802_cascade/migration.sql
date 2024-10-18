-- DropForeignKey
ALTER TABLE "ativo" DROP CONSTRAINT "ativo_carteiraId_fkey";

-- AddForeignKey
ALTER TABLE "ativo" ADD CONSTRAINT "ativo_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "carteira"("id") ON DELETE CASCADE ON UPDATE CASCADE;
