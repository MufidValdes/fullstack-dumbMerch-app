import * as productRepository from '../repositories/product';
import {
  CreateReviewDTO,
  ProductDTO,
  UpdateProductDTO,
} from '../dto/product.dto';

export const getProductById = async (id: number) => {
  return productRepository.getProductById(id);
};

export const getAllproducts = async () => {
  return productRepository.getAllproducts();
};

export const createProduct = async (data: ProductDTO) => {
  const product = productRepository.createProduct(data);
  console.log((await product).id);
  if (data.images) {
    await productRepository.createProductImages(
      data.images,
      (
        await product
      ).id
    );
  }
  console.log(product);
  return product;
};

export async function updateProduct(productId: number, data: UpdateProductDTO) {
  const product = productRepository.updateProduct(productId, data);
  console.log((await product).id);
  if (data.images) {
    await productRepository.createProductImages(
      data.images,
      (
        await product
      ).id
    );
  }
  console.log(product);
  return product;
}

export async function deleteProduct(productId: number) {
  return productRepository.deleteProduct(productId);
}

export async function deleteProductImage(imageId: number) {
  return productRepository.deleteProductImage(imageId);
}

export async function addReview(data: CreateReviewDTO) {
  return productRepository.addReview(data);
}

export async function getProductReviews(productId: number) {
  return productRepository.getProductReviews(productId);
}

export async function search(query: string, sortby: string, orderBy: string) {
  return productRepository.searchProduct(query, sortby, orderBy);
}
