-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "paymentType" TEXT,
    "transactionId" TEXT,
    "grossAmount" DECIMAL(65,30) NOT NULL,
    "transactionStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_orderId_key" ON "payments"("orderId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
