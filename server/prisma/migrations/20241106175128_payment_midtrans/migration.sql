/*
  Warnings:

  - You are about to drop the column `grossAmount` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gross_amount` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_orderId_fkey";

-- DropIndex
DROP INDEX "payments_orderId_key";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "grossAmount",
DROP COLUMN "orderId",
ADD COLUMN     "gross_amount" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "order_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_order_id_key" ON "payments"("order_id");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
