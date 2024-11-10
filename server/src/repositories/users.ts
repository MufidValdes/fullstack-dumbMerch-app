import { RegisterDTO } from '@dto/auth.dto';
import { Gender, Role } from '@prisma/client';
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
export const getAllUsers = async () => {
  return prisma.users.findMany({
    include: {
      profile: true,
    },
  });
};

// deleteuser
export const deleteUser = async (userId: number) => {
  return prisma.users.delete({
    where: {
      id: userId,
    },
  });
};

// updateuser
export const updateUser = async (
  userId: number,
  data: Partial<{
    email: string;
    username: string;
    password: string;
    role: Role;
    fullname: string;
    phone: string;
    address: string;
    gender: Gender;
    avatar: string;
  }>
) => {
  const {
    email,
    username,
    password,
    role,
    fullname,
    phone,
    address,
    gender,
    avatar,
  } = data;

  return prisma.users.update({
    where: {
      id: userId,
    },
    data: {
      email,
      username,
      password,
      role,
      profile: {
        update: {
          fullname,
          phone,
          address,
          gender,
          avatar,
        },
      },
    },
  });
};
