import { Request, Response } from 'express';
import * as orderService from '@services/order.service';

export async function createOrder(req: Request, res: Response) {
  // #swagger.tags = ['Order']
  // #swagger.description = 'Create a new order'
  /**
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'Order details',
     schema: {
       $ref: '#/definitions/Order'
     }
   }
  */
  // try {
  //   const orderData: OrderDTO = req.body;
  //   const userId = (req as any).user.id; // Assuming user authentication middleware
  //   const newOrder = await orderService.createOrder(orderData);
  //   res.status(201).json(newOrder);
  // } catch (error) {
  //   res.status(500).json({ error: 'Error creating order', details: error });
  // }
}

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
