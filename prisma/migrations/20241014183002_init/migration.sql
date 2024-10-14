-- CreateTable
CREATE TABLE "blackListToken" (
    "id" SERIAL NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blackListToken_pkey" PRIMARY KEY ("id")
);
