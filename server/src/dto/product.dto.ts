import { Decimal } from '@prisma/client/runtime/library';

export interface ProductDTO {
  product_name: string;
  description: string;
  price: Decimal;
  stock: number;
  categoryId: number;
}

export interface UpdateProductDTO {
  product_name?: string;
  description?: string;
  price?: Decimal;
  stock?: number;
  categoryId?: number;
}

export interface CreateReviewDTO {
  rating: number;
  comment?: string;
  userId: number;
  productId: number;
}
