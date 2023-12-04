import express from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { AuthController } from '../controllers/auth.controller';

export const auth = express.Router();

const authMiddleware = new AuthMiddleware();

const authController = new AuthController();

auth.post('/register', authController.register);
auth.post('/authenticate', authController.authenticate);
auth.get('/authenticate/google', authController.google);
auth.use(authMiddleware.middleware);
auth.get('/verify', authController.verify);
