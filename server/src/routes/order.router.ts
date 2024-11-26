import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { authentication } from '../middlewares/auth.middleware';

const OrderRouter = Router();

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

// OrderRouter.put('/', authentication, orderController.cancelOrder);
// OrderRouter.put('/', authentication, orderController.updatePaymentStatus);

OrderRouter.post(
  '/checkout',
  authentication,
  orderController.createOrderFromCart
);

OrderRouter.get('/:orderId/shipping', orderController.getShippingDetails);
OrderRouter.post('/:orderId/shipping', orderController.addShippingDetails);
OrderRouter.put('/:orderId/shipping', orderController.updateShippingDetails);

export default OrderRouter;

// src/routes/order.routes.ts
