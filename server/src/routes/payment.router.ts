// src/routes/payment.router.ts

import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller';
import { authentication, authorize } from '../middlewares/auth.middleware';

const PaymentRouter = Router();

PaymentRouter.use(authentication);

PaymentRouter.post('/', paymentController.createPayment);
PaymentRouter.post(
  '/notification',
  paymentController.handlePaymentNotification
);
PaymentRouter.get('/', authorize(['ADMIN']), paymentController.getPayment);

export default PaymentRouter;
