import express from 'express';
import { ConversationController } from '../controllers/conversation.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const conversation = express.Router();

const authMiddleware = new AuthMiddleware();

const conversationController = new ConversationController();

conversation.use(authMiddleware.middleware);
conversation.post('/', conversationController.complete);
