/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "note" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
