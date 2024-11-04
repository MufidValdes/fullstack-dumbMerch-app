import { Router } from 'express';
import chatController from '@src/controllers/chat.controller';
import { authentication } from '@src/middlewares/auth.middleware';

const ChatRouter = Router();
ChatRouter.use(authentication);

// Rute untuk membuat room chat
ChatRouter.post('/create-room', chatController.createRoom);

ChatRouter.post('/messages', chatController.message);

// Rute untuk mendapatkan pesan di room tertentu
ChatRouter.get('/messages/:roomId', chatController.getMessages);

export default ChatRouter;
