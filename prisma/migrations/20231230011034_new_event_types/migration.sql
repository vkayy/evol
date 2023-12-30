/*
  Warnings:

  - The values [CHILD_BIRTH] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('ANNIVERSARY', 'ARGUMENT', 'BIRTHDAY', 'CHILDBIRTH', 'DATE', 'ENGAGEMENT', 'FIRST', 'HANGOUT', 'MARRIAGE', 'MILESTONE', 'MOVING_IN', 'PARTY', 'VACATION', 'OTHER');
ALTER TABLE "event" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;
