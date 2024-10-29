import {
  CreateReviewDTO,
  ProductDTO,
  UpdateProductDTO,
} from '@src/dto/product.dto';
import prisma from '@utils/prisma.client';

// Membuat kategori baru
export const createProduct = async (data: ProductDTO) => {
  const { images, stock, categoryId, ...dataProduct } = data;

  return prisma.products.create({
    data: {
      ...dataProduct,
      stock: +stock,
      categoryId: +categoryId,
    },
  });
};

// Mendapatkan semua kategori
export const getAllproducts = async () => {
  return prisma.products.findMany({
    include: {
      reviews: true,
      category: true,
    },
  });
};

// Mendapatkan kategori berdasarkan ID
export const getProductById = async (id: number) => {
  return prisma.products.findUnique({
    where: { id },
    include: {
      reviews: true,
      category: true,
    },
  });
};

export async function updateProduct(productId: number, data: UpdateProductDTO) {
  return await prisma.products.update({
    where: {
      id: productId,
    },
    data,
  });
}

export async function deleteProduct(productId: number) {
  return await prisma.products.delete({
    where: { id: productId },
  });
}

export async function addReview(data: CreateReviewDTO) {
  return await prisma.reviews.create({
    data,
  });
}

export async function getProductReviews(productId: number) {
  return await prisma.reviews.findMany({
    where: { productId },
    include: { user: true },
  });
}
