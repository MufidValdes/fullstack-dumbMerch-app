import prisma from '../utils/prisma.client';

export async function addReview(
  userId: number,
  productId: number,
  rating: number,
  comment?: string
) {
  return prisma.reviews.create({
    data: {
      userId,
      productId,
      rating,
      comment,
    },
  });
}

export async function getProductReviews(productId: number) {
  return prisma.reviews.findMany({
    where: { productId },
    include: { user: { select: { profile: true } } }, // Optional to include user profile data
  });
}
