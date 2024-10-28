import * as categoryRepository from '@repositories/category';
import { CategoryDTO } from '@dto/category.dto';

export const createCategory = async (data: CategoryDTO) => {
  return categoryRepository.createCategory(data);
};

export const getCategories = async () => {
  return categoryRepository.getAllCategories();
};

export const getCategoryById = async (id: number) => {
  return categoryRepository.getCategoryById(id);
};

export const updateCategory = async (id: number, data: CategoryDTO) => {
  return categoryRepository.updateCategory(id, data);
};

export const deleteCategory = async (id: number) => {
  return categoryRepository.deleteCategory(id);
};
