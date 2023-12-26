/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");
