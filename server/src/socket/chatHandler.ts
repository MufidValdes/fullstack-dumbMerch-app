// chatHandler.ts

import chatService from '@src/services/chat.service';
import { Socket, Server } from 'socket.io';
import { Role } from '@prisma/client';

const ADMIN_ROLE = Role.ADMIN;

const chatHandler = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    console.log('User connected:', socket.id);

    const userId = socket.handshake.query.userId as string;
    const user = await chatService.getUserById(parseInt(userId));

    // Validasi role pengguna
    if (!user || (user.role !== Role.USER && user.role !== ADMIN_ROLE)) {
      socket.emit('error', { message: 'Access denied' });
      return socket.disconnect();
    }

    // Admin atau User?
    if (user.role === ADMIN_ROLE) {
      socket.join('admin-room');
      console.log('Admin joined admin-room');
    } else {
      const roomId = await chatService.createRoom(parseInt(userId));
      socket.join(`room-${roomId.id}`);
      socket.emit('roomJoined', { roomId: roomId.id });

      const previousMessages = await chatService.getRoomMessages(roomId.id);
      socket.emit('previousMessages', previousMessages);
    }

    // Menerima pesan
    socket.on('sendMessage', async ({ roomId, message }) => {
      try {
        const senderId = parseInt(userId);
        const newMessage = await chatService.saveMessage(
          roomId,
          senderId,
          message
        );
        io.to(`room-${roomId}`).emit('newMessage', newMessage);
      } catch (error) {
        console.error('Error sending message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Saat user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default chatHandler;
