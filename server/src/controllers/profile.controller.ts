import { Request, Response } from 'express';
import * as profileService from '../services/profile.service';
import { ProfileDTO } from '../dto/profile.dto';
import { uploadSingle } from '../utils/cloudinary';

export const getProfile = async (req: Request, res: Response) => {
  // #swagger.tags = ['PROFILE']
  // #swagger.description = 'Retrieve profile information for the logged-in user'
  try {
    const userId = res.locals.user.id;
    const profile = await profileService.getProfile(userId);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'error fetching profile', error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  // #swagger.tags = ['PROFILE']
  /**
   * #swagger.parameters['body'] = {
   *    in: 'body',
   *    description: 'Update user profile information',
   *    schema: { $ref: '#/definitions/ProfileUpdate' }
   * }
   */
  try {
    const userId = res.locals.user.id;
    const data: ProfileDTO = req.body;

    if (req.file) {
      const { url } = await uploadSingle(req.file as Express.Multer.File);
      data.avatar = url;
    }
    console.log(req.file);
    const updatedProfile = await profileService.updateProfile(userId, data);
    res.json(updatedProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating profile', error });
  }
};
