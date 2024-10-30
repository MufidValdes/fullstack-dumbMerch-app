import { Decimal } from '@prisma/client/runtime/library';
import { CategoryDTO } from './category.dto';

export interface ProductDTO {
  id: number;
  product_name: string;
  description: string;
  price: Decimal;
  stock: number;
  categoryId: number;
  images: ProductImageDTO[];
  averageRating?: number;
  reviews?: CreateReviewDTO[];
}

export interface ProductImageDTO {
  imageUrl: string;
}
export interface UpdateProductDTO {
  id: number;
  product_name: string;
  description: string;
  price: Decimal;
  stock: number;
  category: CategoryDTO;
  categoryId: number;
  images: ProductImageDTO[];
  averageRating?: number;
  reviews?: CreateReviewDTO[];
}
export interface CreateReviewDTO {
  rating: number;
  comment?: string;
  userId: number;
  productId: number;
}
