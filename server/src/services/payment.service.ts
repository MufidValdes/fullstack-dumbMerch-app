// src/services/payment.service.ts

import prisma from '../utils/prisma.client';
import snap from '../utils/midtrans';
import { CreatePaymentDTO } from '../dto/payment.dto';
import { PaymentStatus } from '@prisma/client';

export async function createPayment(data: CreatePaymentDTO) {
  // Fetch order details with user information
  const order = await prisma.orders.findUnique({
    where: { id: data.order_id },
    include: {
      user: true,
      orderItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
      shippingDetails: true,
    },
  });
  console.log('order ', order);
  if (!order) {
    throw new Error('Order not found');
  }
  // Cek apakah pembayaran sudah ada untuk order_id ini
  let payment = await prisma.payments.findUnique({
    where: { order_id: data.order_id },
  });
  if (payment) {
    // Jika pembayaran sudah ada, kembalikan pembayaran yang ada atau lakukan update status jika diperlukan
    return {
      ...payment,
      redirectUrl: payment.redirect_url,
      message: 'Payment already exists, skipping creation.',
    };
  }
  // Map item_details dynamically from orderItems
  const item_details = order.orderItems.map((orderItem) => ({
    id: `product-${orderItem.productId}`, // Unique ID for each item
    price: +orderItem.price, // Convert price to number
    quantity: +orderItem.quantity, // Quantity of the product
    name: orderItem.product.product_name || 'Item', // Product name with fallback
    brand: '',
    category: '',
    merchant_name: '',
    tenor: '03',
    code_plan: '000',
    mid: '123456',
  }));
  console.log('detail', item_details);
  const paymentParams = {
    transaction_details: {
      order_id: `order-${data.order_id}-${Date.now()}`,
      // gross_amount: +item_details.reduce((a, b) => {
      //   return a + b.quantity * b.price;
      // }, 0),
      gross_amount: order.totalAmount,
    },
    item_details: item_details,
    customer_details: {
      first_name: order.user.username,
      email: order.user.email,
      phone: +628123456,
      shipping_address: {
        first_name: order.user.username,
        email: order.user.email,
        phone: order.shippingDetails?.phone,
        address: order.shippingDetails?.address,
        city: order.shippingDetails?.city,
        postal_code: order.shippingDetails?.postalCode,
        country_code: 'IDN',
      },
    },
  };
  console.log('midtrans', paymentParams);
  // Create Midtrans transaction
  const transaction = await snap.createTransaction(paymentParams);
  console.log(transaction);
  // Store payment transaction details in the database
  payment = await prisma.payments.create({
    data: {
      order_id: data.order_id,
      order_transactionId: paymentParams.transaction_details.order_id,
      gross_amount: data.gross_amount,
      transaction_token: transaction.token,
      transaction_status: 'PENDING',
      payment_type: 'payment',
      paymentStatus: 'PENDING',
      redirect_url: transaction.redirect_url,
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
      transaction_status: status,
      paymentStatus,
    },
  });
}

export async function getPayment() {
  return await prisma.payments.findMany({
    include: {
      order: {
        include: {
          user: {
            select: {
              email: true,
            },
          },
          shippingDetails: true,
        },
      },
    },
  });
}
