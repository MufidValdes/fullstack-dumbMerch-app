import { Server } from 'socket.io';

class SocketServer {
  private static instance: Server | null = null;

  public static init(server: any): Server {
    if (!SocketServer.instance) {
      SocketServer.instance = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });
    }
    return SocketServer.instance;
  }

  public static getInstance(): Server {
    if (!SocketServer.instance) {
      throw new Error('Socket.IO server not initialized. Call init() first.');
    }
    return SocketServer.instance;
  }
}

export default SocketServer;
