import { Request, Response } from 'express';
import chatService from '@src/services/chat.service';

class ChatController {
  async createRoom(req: Request, res: Response) {
    const { roomId } = req.body;
    const userId = res.locals.user.id;

    try {
      const room = await chatService.createRoom(roomId, userId);
      res.status(200).json({ roomId: room.id });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create room' });
    }
  }

  async getMessages(req: Request, res: Response) {
    const { roomId } = req.params;

    try {
      const messages = await chatService.getRoomMessages(parseInt(roomId));
      res.status(200).json(messages);
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to fetch messages' });
      return;
    }
  }

  async message(req: Request, res: Response) {
    const { roomId, message } = req.body;
    const senderId = res.locals.user.id;
    try {
      const newMessage = await chatService.saveMessage(
        roomId,
        senderId,
        message
      );
      res.status(200).send({ message: newMessage });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  }
}

export default new ChatController();
