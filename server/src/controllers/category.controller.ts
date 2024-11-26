import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';
import { CategoryDTO } from '../dto/category.dto';

export const addCategory = async (req: Request, res: Response) => {
  // #swagger.tags = ['Category']
  /**
   * #swagger.parameters['body'] = {
   *    in: 'body',
   *    description: 'Create a new category',
   *    schema: { $ref: '#/definitions/Category' }
   * }
   */
  try {
    const data: CategoryDTO = req.body;
    const category = await categoryService.createCategory(data);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const listCategories = async (req: Request, res: Response) => {
  // #swagger.tags = ['Category']
  // #swagger.description = 'Retrieve all categories'
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving categories' });
  }
};

export const findCategoryById = async (req: Request, res: Response) => {
  // #swagger.tags = ['Category']
  /**
   * #swagger.parameters['id'] = {
   *    description: 'find category by id',
   * }
   */
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(+id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving category' });
  }
};

export const modifyCategory = async (req: Request, res: Response) => {
  // #swagger.tags = ['Category']
  /**
   * #swagger.parameters['body'] = {
   *    in: 'body',
   *    description: 'Update user profile information',
   *    schema: { $ref: '#/definitions/Category' }
   * }
   */
  try {
    const { id } = req.params;
    const data: CategoryDTO = req.body;
    const updatedCategory = await categoryService.updateCategory(+id, data);
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Error updating category' });
  }
};

export const removeCategory = async (req: Request, res: Response) => {
  // #swagger.tags = ['Category']
  /**
   * #swagger.parameters['id'] = {
   *    description: 'remove a category',
   * }
   */
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(+id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
