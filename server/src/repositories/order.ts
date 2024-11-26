import {
  CreateOrderDTO,
  ShippingDetailsDTO,
  UpdateOrderStatusDTO,
  UpdatePaymentStatusDTO,
} from '../dto/order.dto';
import prisma from '../utils/prisma.client';

export async function getUserOrders(userId: number) {
  return prisma.orders.findMany({
    where: { userId },
    include: {
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

export async function createShippingDetails(
  orderId: number,
  data: ShippingDetailsDTO
) {
  return prisma.shippingDetails.create({
    data: {
      orderId,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      phone: data.phone,
    },
  });
}

export async function updateShippingDetails(
  orderId: number,
  data: ShippingDetailsDTO
) {
  return prisma.shippingDetails.update({
    where: { orderId },
    data,
  });
}

export async function getShippingDetails(orderId: number) {
  return prisma.shippingDetails.findUnique({
    where: { orderId },
  });
}
