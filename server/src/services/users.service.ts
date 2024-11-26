import { Gender, Role } from '@prisma/client';
import * as usersRepository from '../repositories/users';
// / {admin only}
// getallusers
export const getAllUsers = async () => {
  return usersRepository.getAllUsers();
};

// deleteuser
export const deleteUser = async (userId: number) => {
  return usersRepository.deleteUser(userId);
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
  return usersRepository.updateUser(userId, data);
};
