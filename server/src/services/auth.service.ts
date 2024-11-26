import { LoginDTO, RegisterDTO } from '../dto/auth.dto';
import * as userRepository from '../repositories/users';
import { comparePassword, hashPassword } from '../utils/encryption';
import jwt from 'jsonwebtoken';
import { saveToken, deleteOldTokens } from '../repositories/token';

export const register = async (IRegister: RegisterDTO) => {
  const existedUser = await userRepository.findUsernameOrEmail(IRegister.email);
  if (existedUser) {
    throw new Error(`User ${IRegister.email} already exists`);
  }
  const generateUsername = IRegister.email.split('@')[0];
  const createUser = await userRepository.createUser({
    ...IRegister,
    username: generateUsername,
    password: await hashPassword(IRegister.password),
  });
  return createUser;
};

export const login = async (ILogin: LoginDTO) => {
  const user = await userRepository.findUsernameOrEmail(ILogin.email);
  if (!user) {
    throw new Error(`User ${ILogin.email} not found`);
  }
  const isValidPassword = await comparePassword(ILogin.password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid email or password');
  }
  const { password, ...userToSign } = user;
  const token = jwt.sign(userToSign, process.env.JWT_SECRET || 'SECRET_KEY', {
    expiresIn: '1d',
  });
  // Hapus token lama dan simpan token baru
  await deleteOldTokens(user.id);
  await saveToken(user.id, token);

  return {
    user: userToSign,
    token: token,
  };
};
