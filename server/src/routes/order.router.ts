import { Router } from 'express';
import * as orderController from '@controllers/order.controller';
import { authentication } from '@src/middlewares/auth.middleware';

const OrderRouter = Router();

/**
 * @Route POST api/orders
 * @Desc Create a new order
 */
OrderRouter.post('/', authentication, orderController.createOrder);

/**
 * @Route GET api/orders
 * @Desc Get all orders for the authenticated user
 */
OrderRouter.get('/', authentication, orderController.getUserOrders);

/**
 * @Route GET api/orders/:orderId
 * @Desc Get order details by order ID
 */
OrderRouter.get('/:orderId', authentication, orderController.getOrderDetails);

export default OrderRouter;
