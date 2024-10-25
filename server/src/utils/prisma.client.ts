import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'],
});
// prisma
//   .$connect()
//   .then(() => console.log('database connected successfully'))
//   .catch((err) => console.log('Error connecting to the database', err));

export default prisma;
