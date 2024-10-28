import * as profileRepository from '@repositories/profile';
import { ProfileDTO } from '@src/dto/profile.dto';

export const getProfile = async (userId: number) => {
  return profileRepository.getProfileByUserId(userId);
};

export const updateProfile = async (userId: number, data: ProfileDTO) => {
  return profileRepository.updateProfileByUserId(userId, data);
};
