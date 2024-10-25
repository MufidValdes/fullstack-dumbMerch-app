import app from '@src/app';
import prisma from './src/utils/prisma.client';

// Load environment variables
require('dotenv').config();

const port = process.env.PORT || 3000;

// Gracefully handle Prisma disconnection
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`Swagger Docs available on http://localhost:${port}/api-docs`);
});
