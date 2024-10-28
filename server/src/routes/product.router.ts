import { authentication } from '@src/middlewares/auth.middleware';
import * as productController from '@controllers/product.controller';
import { Router } from 'express';

const ProductRouter = Router();

ProductRouter.get('/', productController.getAllproducts);
ProductRouter.get('/:id', productController.getProductById);
ProductRouter.post('/', authentication, productController.createProduct);
ProductRouter.put('/:id', authentication, productController.updateProduct);
ProductRouter.delete('/:id', authentication, productController.deleteProduct);

ProductRouter.post('/:id/review', authentication, productController.addReview);
ProductRouter.get(
  '/:id/review',
  authentication,
  productController.getProductReviews
);
export default ProductRouter;
