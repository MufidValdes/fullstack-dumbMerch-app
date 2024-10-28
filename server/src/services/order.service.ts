import * as orderRepository from '@repositories/order';
import { CreateOrderDTO } from '@src/dto/order.dto';

export async function createOrder(data: CreateOrderDTO) {
  return orderRepository.createOrder(data);
}

export async function getUserOrders(userId: number) {
  return orderRepository.getUserOrders(userId);
}

export async function getOrderDetails(orderId: number) {
  return orderRepository.getOrderDetails(orderId);
}
