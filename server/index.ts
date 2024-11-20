import app from './src/app';
import prisma from './src/utils/prisma.client';
import { Server as httpServer } from 'http';
import SocketServer from '@src/socket/socketServer';
import chatHandler from '@src/socket/chatHandler';
// Load environment variables
require('dotenv').config();

const port = process.env.PORT || 3000;
const server = new httpServer(app);
// Inisialisasi instance socket server
const io = SocketServer.init(server);

// Pasang handler untuk fitur chat
chatHandler(io);

// Gracefully handle Prisma disconnection
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`Swagger Docs available on http://localhost:${port}/api-docs`);

  console.log('Server is running on port 3000');
});
// =============================
// app.listen(port, () => {
// });
