-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "lastMessage" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
