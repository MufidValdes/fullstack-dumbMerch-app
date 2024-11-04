// chat.service.ts

import prisma from '@utils/prisma.client';
import { ChatRooms, ChatMessages, Users, Role } from '@prisma/client';

class ChatService {
  async createRoom(userId: number): Promise<ChatRooms> {
    const admin = await prisma.users.findFirst({ where: { role: Role.ADMIN } });
    if (!admin) throw new Error('No admin available');

    return await prisma.chatRooms.upsert({
      where: { userId_adminId: { userId, adminId: admin.id } },
      create: { userId, adminId: admin.id },
      update: {},
    });
  }

  async saveMessage(
    roomId: number,
    senderId: number,
    message: string
  ): Promise<ChatMessages> {
    return await prisma.chatMessages.create({
      data: { roomId, senderId, message },
    });
  }

  async getRoomMessages(roomId: number): Promise<ChatMessages[]> {
    return await prisma.chatMessages.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
      take: 50, // Limit pesan yang diambil untuk meningkatkan performa
    });
  }

  async getUserById(userId: number): Promise<Users | null> {
    return await prisma.users.findUnique({ where: { id: userId } });
  }
}

export default new ChatService();
