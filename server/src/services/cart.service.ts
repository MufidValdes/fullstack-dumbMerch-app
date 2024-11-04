// src/services/cart.service.ts

import { AddToCartDTO, UpdateCartItemDTO } from '@src/dto/cart.dto';
import prisma from '@src/utils/prisma.client';
import * as CartRepository from '@repositories/cart';

export async function getCartByUserId(userId: number) {
  return CartRepository.getCartByUserId(userId);
}

export async function addToCart(userId: number, data: AddToCartDTO) {
  return CartRepository.addToCart(userId, data);
}

export async function updateCartItem(
  cartItemId: number,
  data: UpdateCartItemDTO
) {
  return CartRepository.updateCartItem(cartItemId, data);
}

export async function removeCartItem(cartItemId: number) {
  return CartRepository.removeCartItem(cartItemId);
}

export async function clearCart(userId: number) {
  return await CartRepository.clearCart(userId);
}
