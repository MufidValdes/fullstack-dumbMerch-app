import prisma from '../utils/prisma.client';
import { CategoryDTO } from '../dto/category.dto';

// Membuat kategori baru
export const createCategory = async (data: CategoryDTO) => {
  return prisma.categories.create({
    data,
  });
};

// Mendapatkan semua kategori
export const getAllCategories = async () => {
  return prisma.categories.findMany({
    orderBy: [
      {
        id: 'asc',
      },
    ],
  });
};

// Mendapatkan kategori berdasarkan ID
export const getCategoryById = async (id: number) => {
  return prisma.categories.findUnique({
    where: { id },
  });
};

// Mengupdate kategori
export const updateCategory = async (id: number, data: CategoryDTO) => {
  return prisma.categories.update({
    where: { id },
    data,
  });
};

// Menghapus kategori
export const deleteCategory = async (id: number) => {
  return prisma.categories.delete({
    where: { id },
  });
};
