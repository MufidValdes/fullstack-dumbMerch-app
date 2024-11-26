import prisma from '../utils/prisma.client';
import { ProfileDTO } from '../dto/profile.dto';

export const updateProfileByUserId = async (
  userId: number,
  data: ProfileDTO
) => {
  return prisma.profiles.update({
    where: { userId },
    data,
  });
};

export const getProfileByUserId = async (userId: number) => {
  return prisma.profiles.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },
  });
};
