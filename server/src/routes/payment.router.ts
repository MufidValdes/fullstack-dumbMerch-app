// src/routes/payment.router.ts

import { Router } from 'express';
import * as paymentController from '@controllers/payment.controller';
import { authentication } from '@middlewares/auth.middleware';

const PaymentRouter = Router();

// PaymentRouter.use(authentication);

PaymentRouter.post('/', paymentController.createPayment);
PaymentRouter.post(
  '/notification',
  paymentController.handlePaymentNotification
);

export default PaymentRouter;
