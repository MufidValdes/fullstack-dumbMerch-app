import { Router } from 'express';
import * as categoryController from '@controllers/category.controller';
import { authentication, authorize } from '@src/middlewares/auth.middleware';
import { Role } from '@prisma/client';

const CategoryRouter = Router();

/**
 * @Route POST api/categories
 * @Desc Create a new category
 */
CategoryRouter.post(
  '/',
  authentication,
  authorize([Role.ADMIN, Role.USER]),
  categoryController.addCategory
);

/**
 * @Route GET api/categories
 * @Desc Get all categories
 */
CategoryRouter.get('/', authentication, categoryController.listCategories);

/**
 * @Route GET api/categories/:id
 * @Desc Get a category by ID
 */
CategoryRouter.get('/:id', authentication, categoryController.findCategoryById);

/**
 * @Route PUT api/categories/:id
 * @Desc Update a category
 */
CategoryRouter.put(
  '/:id',
  authentication,
  authorize([Role.ADMIN]),
  categoryController.modifyCategory
);

/**
 * @Route DELETE api/categories/:id
 * @Desc Delete a category
 */
CategoryRouter.delete(
  '/:id',
  authentication,
  authorize([Role.ADMIN]),
  categoryController.removeCategory
);

export default CategoryRouter;
