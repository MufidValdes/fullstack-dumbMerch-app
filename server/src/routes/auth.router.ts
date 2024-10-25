import * as authController from '@controllers/auth.controller';
import { Router, Request, Response } from 'express';

const Authrouter = Router();

/**
 * @Route POST api/auth/login
 * @Desc login with email and password
 */
Authrouter.post('/login', authController.login);

/**
 * @Route POST api/auth/register
 * @Desc register new user
 */
Authrouter.post('/register', authController.register);

/**
 * @Route api/auth/check
 * @Desc verification user account
 */
Authrouter.get('/check', authController.authcheck);

export default Authrouter;
