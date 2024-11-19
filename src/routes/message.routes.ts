import express from 'express';
import { MessageController } from '../controllers/message.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export const message = express.Router();

const authMiddleware = new AuthMiddleware();

const messageController = new MessageController();

message.use(authMiddleware.middleware);
message.post('/', messageController.create);
