// chat.service.ts

import prisma from '@src/utils/prisma.client';

const chatService = {
  async getActiveUsers() {
    try {
      // Mengambil daftar pengguna aktif dari database (misalnya, user yang memiliki sesi aktif)
      const activeUsers = await prisma.chatRooms.findMany({
        select: {
          roomId: true, // Mengambil roomId unik
          userId: true, // Mengambil ID pengguna
        },
      });
      return activeUsers; // Kembalikan array pengguna aktif beserta roomId mereka
    } catch (error) {
      console.error('Error fetching active users:', error);
      throw new Error('Could not fetch active users');
    }
  },

  // Fungsi lain yang dibutuhkan pada chat service
  async getUserById(userId: number) {
    return await prisma.users.findUnique({
      where: { id: +userId },
    });
  },

  async createRoom(roomId: number, userId: number) {
    // Membuat room baru atau mengambil room yang sudah ada untuk user tertentu
    const existingRoom = await prisma.chatRooms.findUnique({
      where: { roomId },
    });

    if (existingRoom) {
      return existingRoom; // Kembalikan room yang sudah ada
    }

    // Jika room belum ada, buat room baru untuk pengguna
    return await prisma.chatRooms.create({
      data: { roomId, userId },
    });
  },

  async getRoomMessages(roomId: number) {
    return await prisma.chatMessages.findMany({
      where: { roomId },
      orderBy: { createdAt: 'asc' },
    });
  },

  async saveMessage(roomId: number, senderId: number, message: string) {
    // Cek apakah room dengan roomId tertentu ada
    const roomExists = await prisma.chatRooms.findUnique({
      where: { roomId },
    });

    if (!roomExists) {
      throw new Error(`Room with ID ${roomId} does not exist.`);
    }

    return await prisma.chatMessages.create({
      data: {
        roomId,
        senderId,
        message,
      },
    });
  },
  async getRoomByRoomId(roomId: number) {
    // Mendapatkan room berdasarkan userId
    return await prisma.chatRooms.findUnique({
      where: { roomId },
    });
  },
};

export default chatService;
