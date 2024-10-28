import * as reviewRepository from '@repositories/review';

export async function addReview(
  userId: number,
  productId: number,
  rating: number,
  comment?: string
) {
  return reviewRepository.addReview(userId, productId, rating, comment);
}

export async function getProductReviews(productId: number) {
  return reviewRepository.getProductReviews(productId);
}
