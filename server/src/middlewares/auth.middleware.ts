import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@utils/prisma.client';
import { Role } from '@prisma/client';

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'SECRET_KEY'
    ) as any;
    // console.log(decoded);
    // Cari user di database berdasarkan token
    const user = await prisma.users.findUnique({
      where: { id: decoded.id },
      include: { token: true },
    });
    // console.log(user);

    if (!user || !user.token.find((t) => t.token === token)) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Masukkan informasi user ke request
    res.locals.user = decoded;
    console.log(res.locals.user);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: 'Token is invalid or expired' });
      return;
    }
    res.status(401).json({ message: 'Unauthorized access' });
    return;
  }
}

export function authorize(roles: Role[]): any {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!roles.includes(user.role))
      return res
        .status(403)
        .json({ message: 'Forbidden you do not have access' });
    next();
  };
}
