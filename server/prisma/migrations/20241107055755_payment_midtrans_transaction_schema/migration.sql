/*
  Warnings:

  - You are about to drop the column `paymentType` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionStatus` on the `payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "payments" DROP COLUMN "paymentType",
DROP COLUMN "transactionId",
DROP COLUMN "transactionStatus",
ADD COLUMN     "payment_type" TEXT,
ADD COLUMN     "transaction_id" TEXT,
ADD COLUMN     "transaction_status" TEXT NOT NULL DEFAULT 'PENDING';
