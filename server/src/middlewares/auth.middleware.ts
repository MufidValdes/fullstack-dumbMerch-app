import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@utils/prisma.client';

export const authMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'SECRET_KEY'
      ) as any;

      // Cari user di database berdasarkan token
      const user = await prisma.users.findUnique({
        where: { id: decoded.id },
        include: { token: true },
      });

      if (!user || !user.token.find((t) => t.token === token)) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Cek apakah user memiliki role yang sesuai
      if (!roles.includes(user.role)) {
        return res
          .status(403)
          .json({ message: 'Forbidden, you do not have access' });
      }

      // Masukkan informasi user ke request
      (req as any).user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};
