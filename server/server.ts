import app from '@src/app';
import chatHandler from '@src/socket/chatHandler';
import SocketServer from '@src/socket/socketServer';
import prisma from './src/utils/prisma.client';
import http from 'http';
// Load environment variables
require('dotenv').config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
// Inisialisasi instance socket server
const io = SocketServer.init(server);

// Pasang handler untuk fitur chat
chatHandler(io);

// Gracefully handle Prisma disconnection
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  console.log(`Swagger Docs available on http://localhost:${port}/api-docs`);
});
