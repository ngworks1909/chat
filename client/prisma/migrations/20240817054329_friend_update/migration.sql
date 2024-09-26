-- CreateEnum
CREATE TYPE "Last" AS ENUM ('None', 'Incoming', 'Outgoing');

-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "last" "Last" NOT NULL DEFAULT 'None',
ADD COLUMN     "messageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "messageType" "MessageType" NOT NULL DEFAULT 'text';
