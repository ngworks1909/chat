/*
  Warnings:

  - You are about to drop the column `lastMessage` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "lastMessage",
DROP COLUMN "time";
