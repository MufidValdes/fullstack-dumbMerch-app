// src/services/payment.service.ts

import prisma from '@utils/prisma.client';
import snap from '@utils/midtrans';
import { CreatePaymentDTO } from '@dto/payment.dto';
import { PaymentStatus } from '@prisma/client';

export async function createPayment(data: CreatePaymentDTO) {
  // Fetch order details with user information
  const order = await prisma.orders.findUnique({
    where: { id: data.order_id },
    include: { user: true },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  const paymentParams = {
    transaction_details: {
      order_id: `order-${data.order_id}-${Date.now()}`,
      gross_amount: +data.gross_amount,
    },
    customer_details: {
      email: order.user.email,
    },
  };

  // Create Midtrans transaction
  const transaction = await snap.createTransaction(paymentParams);

  // Store payment transaction details in the database
  const payment = await prisma.payments.create({
    data: {
      order_id: data.order_id,
      gross_amount: data.gross_amount,
      transactionId: transaction.token,
      transactionStatus: 'PENDING',
    },
  });

  return { ...payment, redirectUrl: transaction.redirect_url };
}

export async function updatePaymentStatus(order_id: number, status: string) {
  let paymentStatus: PaymentStatus = 'PENDING';

  if (status === 'capture' || status === 'settlement') {
    paymentStatus = 'COMPLETED';
  } else if (status === 'cancel' || status === 'deny' || status === 'expire') {
    paymentStatus = 'FAILED';
  }

  return await prisma.payments.update({
    where: { order_id },
    data: {
      transactionStatus: status,
      paymentStatus,
    },
  });
}
