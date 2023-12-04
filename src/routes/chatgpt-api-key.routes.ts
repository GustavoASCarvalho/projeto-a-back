import { ChatgptApiKeyController } from '../controllers/chatgpt-api-key.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import express from 'express';

export const chatgptApiKey = express.Router();

const authMiddleware = new AuthMiddleware();

const chatgptApiKeyController = new ChatgptApiKeyController();

chatgptApiKey.use(authMiddleware.middleware);
chatgptApiKey.post('/', chatgptApiKeyController.create);
chatgptApiKey.get('/', chatgptApiKeyController.list);
