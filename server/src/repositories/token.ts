import prisma from '../utils/prisma.client';
import { TokenType } from '@prisma/client';
import jwt from 'jsonwebtoken';

// Simpan token JWT ke database
export const saveToken = async (userId: number, token: string) => {
  return prisma.token.create({
    data: {
      token,
      type: TokenType.ACCESS_TOKEN,
      userId,
    },
  });
};

// Hapus token lama saat login ulang
export const deleteOldTokens = async (userId: number) => {
  return prisma.token.deleteMany({
    where: {
      userId,
      type: TokenType.ACCESS_TOKEN,
    },
  });
};
