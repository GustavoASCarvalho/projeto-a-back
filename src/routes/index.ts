import express from 'express';
import { auth } from './auth.routes';
import { AuthController } from '../controllers/auth.controller';

export const rotas = express.Router();
const authController = new AuthController();

rotas.get('/sessions/oauth/google', authController.google);
rotas.use('/auth', auth);
