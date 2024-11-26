import * as orderRepository from '../repositories/order';
import {
  ShippingDetailsDTO,
  UpdateOrderStatusDTO,
  UpdatePaymentStatusDTO,
} from '../dto/order.dto';

export async function getUserOrders(userId: number) {
  return orderRepository.getUserOrders(userId);
}

export async function updateOrderStatus(
  orderId: number,
  data: UpdateOrderStatusDTO
) {
  return orderRepository.updateOrderStatus(orderId, data);
}

export async function updatePaymentStatus(
  orderId: number,
  data: UpdatePaymentStatusDTO
) {
  return orderRepository.updatePaymentStatus(orderId, data);
}

export async function getOrderDetails(orderId: number) {
  return orderRepository.getOrderDetails(orderId);
}

export async function createShippingDetails(
  orderId: number,
  data: ShippingDetailsDTO
) {
  return orderRepository.createShippingDetails(orderId, data);
}

export async function updateShippingDetails(
  orderId: number,
  data: ShippingDetailsDTO
) {
  return orderRepository.updateShippingDetails(orderId, data);
}

export async function getShippingDetails(orderId: number) {
  return orderRepository.getShippingDetails(orderId);
}
