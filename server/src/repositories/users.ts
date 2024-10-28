import { RegisterDTO } from '@dto/auth.dto';
import prisma from '@utils/prisma.client';

export const createUser = async (IRegister: RegisterDTO) => {
  return prisma.users.create({
    data: {
      email: IRegister.email,
      password: IRegister.password,
      username: IRegister.username,
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
// {admin only}
// getallusers
// deleteuser
// updateuser
