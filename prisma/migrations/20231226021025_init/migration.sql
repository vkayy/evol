/*
  Warnings:

  - You are about to drop the column `role` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_userId_fkey";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "role",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "note";

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");
