import { Request, Response } from 'express';
import * as reviewService from '@services/review.service';

export async function addReview(req: Request, res: Response) {
  // #swagger.tags = ['REVIEW']
  /**
   * #swagger.parameters['body'] = {
   *    in: 'body',
   *    description: 'Add a review for a product',
   *    schema: { $ref: '#/definitions/Review' }
   * }
   */
  try {
    const { productId, rating, comment } = req.body;
    const userId = res.locals.user.id;

    const newReview = await reviewService.addReview(
      userId,
      productId,
      rating,
      comment
    );
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Error adding review', details: error });
  }
}

export async function getProductReviews(req: Request, res: Response) {
  // #swagger.tags = ['REVIEW']
  // #swagger.description = 'Retrieve all reviews for a specific product'
  try {
    const { productId } = req.params;
    const reviews = await reviewService.getProductReviews(parseInt(productId));
    res.json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching product reviews', details: error });
  }
}
