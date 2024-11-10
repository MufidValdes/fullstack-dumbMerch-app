// delete User (admin only)
//  get all users (admin only)
//  update user (admin only)
// src/routes/adminRoutes.ts
import { Router } from 'express';
import * as usersController from '@controllers/admin.controllers';
import { authentication, authorize } from '@src/middlewares/auth.middleware';
import { Role } from '@prisma/client';
const usersRouter = Router();
usersRouter.use(authentication);
usersRouter.use(authorize(['ADMIN']));

usersRouter.get('/', usersController.getAllUsers);
usersRouter.delete('/:id', usersController.deleteUser);
usersRouter.put('/:id', usersController.updateUser);

export default usersRouter;
