-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MERCHANT', 'ADMIN');

-- CreateTable
CREATE TABLE "SequenceId" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 1,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "SequenceId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MERCHANT',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationCode" TEXT NOT NULL DEFAULT '_________',
    "verificationShortCode" TEXT,
    "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
    "onboardingFarthestStep" INTEGER DEFAULT 1,
    "primaryCompanyId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FileUpload" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "userId" TEXT,
    "companyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FileUpload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "initDb" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "initDb_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SequenceId_companyId_model_idx" ON "SequenceId"("companyId", "model");

-- CreateIndex
CREATE UNIQUE INDEX "SequenceId_companyId_model_key" ON "SequenceId"("companyId", "model");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_slug_key" ON "Company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE INDEX "initDb_name_idx" ON "initDb"("name");

-- AddForeignKey
ALTER TABLE "SequenceId" ADD CONSTRAINT "SequenceId_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_primaryCompanyId_fkey" FOREIGN KEY ("primaryCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
