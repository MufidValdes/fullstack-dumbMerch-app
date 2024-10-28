// src/dto/order.dto.ts

import { OrderStatus, PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export interface CreateOrderDTO {
  userId: number;
  paymentMethod: string;
  shippingDetails: ShippingDetailsDTO;
  orderItems: OrderItemDTO[];
}
export interface UpdateOrderStatusDTO {
  orderStatus: OrderStatus;
}
export interface UpdatePaymentStatusDTO {
  paymentStatus: PaymentStatus;
}

export interface OrderItemDTO {
  productId: number;
  quantity: number;
  price: Decimal;
}

export interface ShippingDetailsDTO {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}
