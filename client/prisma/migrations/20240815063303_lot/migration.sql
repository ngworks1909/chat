/*
  Warnings:

  - You are about to drop the column `email` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `messageCount` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `mobile` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `senderEmail` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `senderImage` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `senderName` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "email",
DROP COLUMN "image",
DROP COLUMN "messageCount",
DROP COLUMN "mobile",
DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "senderEmail",
DROP COLUMN "senderImage",
DROP COLUMN "senderName";
