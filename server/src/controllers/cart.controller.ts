// src/controllers/cart.controller.ts

import { Request, Response } from 'express';
import * as cartService from '@services/cart.service';
import { AddToCartDTO, UpdateCartItemDTO } from '@dto/cart.dto';

export async function getCart(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'someting is wrong' });
  }
}

export async function addToCart(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    const data: AddToCartDTO = req.body;
    const cartItem = await cartService.addToCart(userId, data);
    res.status(201).json(cartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'someting is wrong' });
  }
}

export async function updateCartItem(req: Request, res: Response) {
  try {
    const cartItemId = Number(req.params.id);
    const data: UpdateCartItemDTO = req.body;
    const updatedCartItem = await cartService.updateCartItem(cartItemId, data);
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'someting is wrong' });
  }
}

export async function removeCartItem(req: Request, res: Response) {
  try {
    const cartItemId = Number(req.params.id);
    await cartService.removeCartItem(cartItemId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'someting is wrong' });
  }
}

export async function clearCart(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;
    await cartService.clearCart(userId);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'someting is wrong' });
  }
}
