import { RegisterDTO } from '@dto/auth.dto';
import prisma from '@utils/prisma.client';

export const cretaeUser = async (IRegister: RegisterDTO) => {
  return prisma.users.create({
    data: {
      ...IRegister,
      profile: {
        create: {
          fullname: IRegister.fullname,
        },
      },
    },
  });
};

export const findUsernameOrEmail = async (usernameOrEmail: string) => {
  return prisma.users.findFirst({
    where: {
      OR: [
        {
          email: usernameOrEmail,
        },
        {
          username: usernameOrEmail,
        },
      ],
    },
  });
};
