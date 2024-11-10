/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `chat_rooms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roomId` to the `chat_rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat_messages" DROP CONSTRAINT "chat_messages_roomId_fkey";

-- AlterTable
ALTER TABLE "chat_rooms" ADD COLUMN     "roomId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chat_rooms_roomId_key" ON "chat_rooms"("roomId");

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "chat_rooms"("roomId") ON DELETE RESTRICT ON UPDATE CASCADE;
