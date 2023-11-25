import express from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthController } from '../controllers/auth.controller';

export const auth = express.Router();

const authController = new AuthController();
const authMiddleware = new AuthMiddleware();

auth.post('/authenticate', authController.authenticate);
auth.use(authMiddleware.middleware);
auth.get('/verify', authController.verify);
