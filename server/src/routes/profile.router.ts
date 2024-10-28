import { Router } from 'express';
import * as profileController from '@controllers/profile.controller';
import { authentication } from '@src/middlewares/auth.middleware';

const ProfileRouter = Router();
/**
 * @Route GET api/profile
 * @Desc Get user profile
 */
ProfileRouter.get('/', authentication, profileController.getProfile);

/**
 * @Route PUT api/profile
 * @Desc Update user profile
 */
ProfileRouter.put('/', authentication, profileController.updateProfile);

export default ProfileRouter;
