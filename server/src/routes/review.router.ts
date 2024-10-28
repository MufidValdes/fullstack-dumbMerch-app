import { Router } from 'express';
import * as reviewController from '@controllers/review.controller';
import { authentication } from '@src/middlewares/auth.middleware';

const ReviewRouter = Router();

/**
 * @Route POST api/reviews
 * @Desc Add a review for a product
 */
ReviewRouter.post('/', authentication, reviewController.addReview);

/**
 * @Route GET api/reviews/:productId
 * @Desc Get all reviews for a specific product
 */
ReviewRouter.get(
  '/:productId',
  authentication,
  reviewController.getProductReviews
);

export default ReviewRouter;
