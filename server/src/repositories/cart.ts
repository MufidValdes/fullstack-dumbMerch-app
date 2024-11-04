// src/services/cart.service.ts

import { AddToCartDTO, UpdateCartItemDTO } from '@src/dto/cart.dto';
import prisma from '@src/utils/prisma.client';

export async function getCartByUserId(userId: number) {
  return await prisma.cart.findUnique({
    where: { userId },
    include: {
      cartItems: {
        include: {
          product: {
            include: {
              images: true,
            },
          },
        },
      },
    },
  });
}

export async function addToCart(userId: number, data: AddToCartDTO) {
  const product = await prisma.products.findUnique({
    where: { id: data.productId },
  });

  if (!product) throw new Error('Product not found');

  // Upsert untuk membuat cart jika belum ada
  const cart = await prisma.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  const existingCartItem = await prisma.cartItems.findFirst({
    where: { cartId: cart.id, productId: data.productId },
  });

  // Update jika produk sudah ada di cart, atau tambahkan jika belum ada
  if (existingCartItem) {
    return await prisma.cartItems.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: existingCartItem.quantity + data.quantity,
        price: product.price,
      },
    });
  } else {
    return await prisma.cartItems.create({
      data: {
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
        price: product.price,
      },
    });
  }
}

export async function updateCartItem(
  cartItemId: number,
  data: UpdateCartItemDTO
) {
  return await prisma.cartItems.update({
    where: { id: cartItemId },
    data: {
      quantity: data.quantity,
    },
  });
}

export async function removeCartItem(cartItemId: number) {
  return await prisma.cartItems.delete({
    where: { id: cartItemId },
  });
}

export async function clearCart(userId: number) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) throw new Error('Cart not found');

  return await prisma.cartItems.deleteMany({
    where: { cartId: cart.id },
  });
}
