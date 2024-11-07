import { Request, Response } from 'express';
import * as orderService from '@services/order.service';
import { PaymentStatus, OrderStatus } from '@prisma/client';
import prisma from '@src/utils/prisma.client';
import { ShippingDetailsDTO } from '@src/dto/order.dto';

export async function getUserOrders(req: Request, res: Response) {
  // #swagger.tags = ['Order']
  // #swagger.description = 'get user details'

  try {
    const userId = res.locals.user.id;
    const orders = await orderService.getUserOrders(userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders', details: error });
  }
}

export async function getOrderDetails(req: Request, res: Response) {
  // #swagger.tags = ['Order']
  // #swagger.description = 'Retrieve an order by ID'
  /**
   #swagger.parameters['id'] = {
     in: 'path',
     description: 'Order ID',
     required: true,
     type: 'integer'
   }
  */
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderDetails(+orderId);
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching order details', details: error });
  }
}

export async function updatePaymentStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const paymentStatus: PaymentStatus = req.body.paymentStatus;
    const updatedOrder = await orderService.updatePaymentStatus(+orderId, {
      paymentStatus,
    });
    res.json(updatedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating payment status', details: error });
  }
}

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const cancelledOrder = await orderService.updateOrderStatus(+orderId, {
      orderStatus: OrderStatus.CANCELED,
    });
    res.json(cancelledOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error canceling order', details: error });
  }
}

export const createOrderFromCart = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    // Ambil cart dan item terkait
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: true },
    });

    if (!cart || cart.cartItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    // Hitung total harga dari item di cart
    const totalAmount = cart?.cartItems.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    // Buat order dan item terkait
    const order = await prisma.orders.create({
      data: {
        userId,
        totalAmount,
        orderItems: {
          create: cart?.cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Kosongkan Cart setelah dibuat Order
    await prisma.cart.update({
      where: { userId },
      data: {
        cartItems: {
          deleteMany: {}, // Hapus semua item dalam cart
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating order from cart' });
  }
};

export async function addShippingDetails(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const shippingData: ShippingDetailsDTO = req.body;
    const shippingDetails = await orderService.createShippingDetails(
      +orderId,
      shippingData
    );
    res.status(201).json(shippingDetails);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'Error adding shipping details', details: error });
  }
}

export async function updateShippingDetails(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const shippingData: ShippingDetailsDTO = req.body;
    const updatedDetails = await orderService.updateShippingDetails(
      +orderId,
      shippingData
    );
    res.json(updatedDetails);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'Error updating shipping details', details: error });
  }
}

export async function getShippingDetails(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const shippingDetails = await orderService.getShippingDetails(+orderId);
    res.json(shippingDetails);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: 'Error fetching shipping details', details: error });
  }
}
