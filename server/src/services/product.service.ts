import * as productRepository from '@repositories/product';
import {
  CreateReviewDTO,
  ProductDTO,
  UpdateProductDTO,
} from '@src/dto/product.dto';

export const getProductById = async (id: number) => {
  return productRepository.getProductById(id);
};

export const getAllproducts = async () => {
  return productRepository.getAllproducts();
};

export const createProduct = async (data: ProductDTO) => {
  return productRepository.createProduct(data);
};

export async function updateProduct(productId: number, data: UpdateProductDTO) {
  return productRepository.updateProduct(productId, data);
}

export async function deleteProduct(productId: number) {
  return productRepository.deleteProduct(productId);
}

export async function addReview(data: CreateReviewDTO) {
  return productRepository.addReview(data);
}

export async function getProductReviews(productId: number) {
  return productRepository.getProductReviews(productId);
}
