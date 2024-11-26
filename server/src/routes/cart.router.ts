import { Router } from 'express';
import * as cartController from '../controllers/cart.controller';
import { authentication } from '../middlewares/auth.middleware';

const CartRouter = Router();

CartRouter.use(authentication);

CartRouter.get('/', cartController.getCart);
CartRouter.post('/', cartController.addToCart);
CartRouter.put('/:id', cartController.updateCartItem);
CartRouter.delete('/:id', cartController.removeCartItem);
CartRouter.delete('/', cartController.clearCart);

export default CartRouter;
