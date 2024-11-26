// chatHandler.ts
import chatService from '../services/chat.service';
import { Socket, Server } from 'socket.io';
import { Role } from '@prisma/client';

const ADMIN_ROLE = Role.ADMIN;
const CUSTOMER_ROLE = Role.USER;
let socketAdmin: Record<string, Socket> = {};
const customerSockets: Record<string, Socket> = {}; // Menyimpan socket pelanggan

interface Message {
  message: string;
  userId: number;
  roomId: string;
}

const chatHandler = (io: Server) => {
  io.on('connection', async (socket: Socket) => {
    console.log('User connected:', socket.id);

    try {
      const userId = socket.handshake.query.userId as string;
      const user = await chatService.getUserById(+userId);
      console.log('role', user?.role);
      const idAdmin = '1';

      // Validasi role pengguna
      if (!user || (user.role !== CUSTOMER_ROLE && user.role !== ADMIN_ROLE)) {
        socket.emit('error', { message: 'Access denied' });
        return socket.disconnect();
      }

      // Tentukan room berdasarkan role pengguna
      if (user.role === ADMIN_ROLE) {
        socketAdmin[+userId] = socket;
        socket.join(`${userId}${idAdmin}`);
        console.log(`Admin joined ${userId}${idAdmin}`);

        const listRooms = (await chatService.getActiveUsers()).map(
          (user) => `${user.userId}${idAdmin}`
        );
        socket.join(listRooms);
        socket.emit('connected', { rooms: [...new Set(listRooms)] });
      } else {
        customerSockets[+userId] = socket;
        // console.log('socek', customerSockets[userId]);
        const roomId = `${userId}${idAdmin}`;
        const room = await chatService.createRoom(+roomId, +userId);

        socket.join(roomId);
        socket.emit('roomJoined', { roomId: room.roomId });

        const previousMessages = await chatService.getRoomMessages(room.roomId);
        socket.emit('previousMessages', previousMessages);
      }

      // Event untuk mendapatkan pesan yang ada
      socket.on('getChats', async ({ roomId }) => {
        const messages = await chatService.getRoomMessages(roomId);
        socket.emit('fullChats', messages);
        console.log('chat', messages);
      });

      // Event untuk mengirim pesan
      socket.on('sendChat', async (data: Message) => {
        try {
          const { roomId, message, userId } = data;
          const newMessage = await chatService.saveMessage(
            +roomId,
            +userId,
            message
          );
          io.to(roomId).emit('receiveChats', newMessage);
        } catch (error) {
          console.error('Error sending message:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      });
      // Event ketika admin ingin berpindah room customer tertentu
      socket.on('switchRoom', (targetUserId: string) => {
        if (socketAdmin[userId]) {
          const targetRoomId = `${targetUserId}${idAdmin}`;
          socketAdmin[userId].join(targetRoomId);
          socketAdmin[userId].emit('switchedRoom', { roomId: targetRoomId });
          console.log(`Admin switched to room: ${targetRoomId}`);
        }
      });
      // Event ketika user disconnect
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        if (user.role === ADMIN_ROLE) delete socketAdmin[userId];
        else delete customerSockets[userId];
      });
    } catch (error) {
      console.error('Error in connection handler:', error);
      socket.emit('error', { message: 'An unexpected error occurred' });
      socket.disconnect();
    }
  });
};

export default chatHandler;
