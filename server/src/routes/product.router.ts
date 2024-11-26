import { authentication } from '../middlewares/auth.middleware';
import * as productController from '../controllers/product.controller';
import { Router } from 'express';
import upload from '../middlewares/uploadFile';

const ProductRouter = Router();

ProductRouter.get('/', productController.getAllproducts);
ProductRouter.get('/:id', productController.getProductById);
ProductRouter.post(
  '/',
  authentication,
  upload.array('images', 3),
  productController.createProduct
);
ProductRouter.put(
  '/:id',
  authentication,
  upload.array('images', 3),
  productController.updateProduct
);
ProductRouter.delete('/:id', authentication, productController.deleteProduct);
ProductRouter.delete(
  '/images/:imageId',
  authentication,
  productController.deleteImageProduct
);
ProductRouter.post('/:id/review', authentication, productController.addReview);
ProductRouter.get(
  '/:id/review',
  authentication,
  productController.getProductReviews
);
export default ProductRouter;
