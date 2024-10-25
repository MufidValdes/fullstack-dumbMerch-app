import { LoginDTO, RegisterDTO } from '@dto/auth.dto';
import { Request, Response } from 'express';
import * as authService from '@services/auth.service';
import { deleteOldTokens } from '@repositories/token';

export async function register(req: Request, res: Response) {
  // #swagger.tags = ['AUTH']
  /**
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'add new user',
     schema: {
       $ref: '#/definitions/Register'
     }
   }
  */
  try {
    const bodyRegister: RegisterDTO = req.body;
    console.log(bodyRegister);

    const user = await authService.register(bodyRegister);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
}

export async function login(req: Request, res: Response) {
  // #swagger.tags = ['AUTH']
  /**
   #swagger.parameters['body'] = {
     in: 'body',
     description: 'login with email and password',
     schema: {
       $ref: '#/definitions/Login'
     }
   }
  */
  try {
    const bodyLogin: LoginDTO = req.body;
    console.log(bodyLogin);
    const user = await authService.login(bodyLogin);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
}

export async function authcheck(req: Request, res: Response) {
  try {
    const user = res.locals.user;

    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
export async function logout(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    await deleteOldTokens(userId);
    return res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging out' });
  }
}
