// src/controllers/payment.controller.ts

import { Request, Response } from 'express';
import * as paymentService from '@services/payment.service';
import { CreatePaymentDTO } from '@dto/payment.dto';

export async function createPayment(req: Request, res: Response) {
  try {
    const data: CreatePaymentDTO = req.body;

    if (!data.order_id || !data.gross_amount) {
      res
        .status(400)
        .json({ message: 'Order ID and Gross Amount are required.' });
    }

    const payment = await paymentService.createPayment(data);
    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function handlePaymentNotification(req: Request, res: Response) {
  try {
    const { order_id, transaction_status } = req.body;
    if (!order_id || !transaction_status) {
      res
        .status(400)
        .json({ message: 'Order ID and transaction status are required.' });
    }

    const orderId = parseInt(order_id.split('-')[1], 10);
    await paymentService.updatePaymentStatus(orderId, transaction_status);
    res.status(200).json({ message: 'Payment status updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function getPayment(req: Request, res: Response) {
  try {
    const response = await paymentService.getPayment();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: (error as Error).message });
  }
}
