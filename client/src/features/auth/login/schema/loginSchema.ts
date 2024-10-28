import { z } from 'zod';

const regexPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(4, 'Fullname minimal kudu 4 karakter boyyy')
      .max(20, 'Fullname maximal kudu 20 karakter boyyy'),
    password: z
      .string()
      .min(6, 'Password minimal kudu 6 karakter boyyy')
      .regex(
        regexPassword,
        'Password harus mengandung angka, huruf besar, kecil dan simbol'
      ),
  })
  .required();

export type LoginSchema = z.infer<typeof loginSchema>;
