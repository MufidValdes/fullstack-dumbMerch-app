import { OrderStatus } from '@prisma/client';
import {
  CreateOrderDTO,
  UpdateOrderStatusDTO,
  UpdatePaymentStatusDTO,
} from '@src/dto/order.dto';
import prisma from '@utils/prisma.client';

export async function createOrder(data: CreateOrderDTO) {
  return prisma.orders.create({
    data: {
      userId: data.userId,
      paymentMethod: data.paymentMethod,
      totalAmount: data.orderItems.reduce(
        (total, item) => total + item.price.toNumber() * item.quantity,
        0
      ), // Calculate based on items
      paymentStatus: 'PENDING',
      orderStatus: 'PENDING',
      shippingDetails: {
        create: data.shippingDetails,
      },
      orderItems: {
        create: data.orderItems,
      },
    },
    include: {
      shippingDetails: true,
      orderItems: true,
    },
  });
}

export async function getUserOrders(userId: number) {
  return prisma.orders.findMany({
    where: { userId },
    include: { orderItems: true },
  });
}

export async function getOrderDetails(orderId: number) {
  return prisma.orders.findUnique({
    where: { id: orderId },
    include: {
      orderItems: true,
      shippingDetails: true,
    },
  });
}

export async function getAllOrders() {
  return await prisma.orders.findMany({
    include: {
      orderItems: true,
      shippingDetails: true,
    },
  });
}

export async function updateOrderStatus(
  orderId: number,
  data: UpdateOrderStatusDTO
) {
  return await prisma.orders.update({
    where: { id: orderId },
    data: {
      orderStatus: data.orderStatus,
    },
  });
}

export async function updatePaymentStatus(
  orderId: number,
  data: UpdatePaymentStatusDTO
) {
  return await prisma.orders.update({
    where: { id: orderId },
    data: { paymentStatus: data.paymentStatus },
  });
}

export async function deleteOrder(orderId: number) {
  return await prisma.orders.delete({
    where: { id: orderId },
  });
}
