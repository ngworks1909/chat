/*
  Warnings:

  - You are about to drop the column `messageCount` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `requestCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "messageCount";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "requestCount";
