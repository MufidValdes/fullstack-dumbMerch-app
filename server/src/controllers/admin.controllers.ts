import { Gender, Role } from '@prisma/client';
import { Request, Response } from 'express';
import * as adminSevice from '@services/users.service';
// / {admin only}
// getallusers
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminSevice.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};
// deleteuser
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await adminSevice.deleteUser(+id);
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
};

export interface Iusers {
  email: string;
  username: string;
  password: string;
  role: Role;
  fullname: string;
  phone: string;
  address: string;
  gender: Gender;
  avatar: string;
}
// updateuser
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Iusers = req.body;
    const users = await adminSevice.updateUser(Number(id), data);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' });
  }
};
