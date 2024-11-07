/*
  Warnings:

  - You are about to alter the column `gross_amount` on the `payments` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "gross_amount" SET DATA TYPE INTEGER;
