/*
  Warnings:

  - You are about to drop the column `shippingAddress` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "shippingAddress",
ALTER COLUMN "totalAmount" SET DEFAULT 0,
ALTER COLUMN "paymentStatus" SET DEFAULT 'PENDING',
ALTER COLUMN "orderStatus" SET DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "ShippingDetails" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "ShippingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShippingDetails_orderId_key" ON "ShippingDetails"("orderId");

-- AddForeignKey
ALTER TABLE "ShippingDetails" ADD CONSTRAINT "ShippingDetails_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
