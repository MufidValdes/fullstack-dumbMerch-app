import {
  CreateReviewDTO,
  ProductDTO,
  ProductImageDTO,
  UpdateProductDTO,
} from '@src/dto/product.dto';
import prisma from '@utils/prisma.client';

// Membuat kategori baru
export const createProduct = async (data: ProductDTO) => {
  const { images, reviews, stock, categoryId, ...dataProduct } = data;

  return prisma.products.create({
    data: {
      ...dataProduct,
      stock: +stock,
      categoryId: +categoryId,
    },
  });
};

export const createProductImages = async (
  images: ProductImageDTO[],
  id: number
) => {
  return prisma.productImages.createMany({
    data: images.map((image) => ({
      imageUrl: image.imageUrl,
      productId: id,
    })),
  });
};

// Mendapatkan semua kategori
export const getAllproducts = async () => {
  return prisma.products.findMany({
    include: {
      images: true,
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

export const updateProduct = async (
  productId: number,
  data: UpdateProductDTO
) => {
  const { images, reviews, category, ...dataProduct } = data;

  // Cari gambar produk lama di database
  const existingImages = await prisma.productImages.findMany({
    where: { productId },
  });

  return prisma.products.update({
    where: { id: productId },
    data: dataProduct,
  });
};
export async function deleteProduct(productId: number) {
  // Hapus semua gambar terkait dari tabel `product_images`
  await prisma.productImages.deleteMany({
    where: { productId },
  });

  // Kemudian hapus produk dari tabel `products`
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

export async function searchProduct(
  query: string,
  sortby: string,
  orderBy: string
) {
  return await prisma.products.findMany({
    where: {
      OR: [
        {
          product_name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: { [sortby]: orderBy },
    include: {
      images: true,
      category: true,
    },
  });
}
