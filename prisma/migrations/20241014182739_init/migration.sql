-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "login" TEXT,
    "senha" TEXT,
    "email" TEXT,
    "ativo" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
