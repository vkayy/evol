/*
  Warnings:

  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "note" DROP CONSTRAINT "note_userId_fkey";

-- DropTable
DROP TABLE "note";

-- DropTable
DROP TABLE "profile";

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
