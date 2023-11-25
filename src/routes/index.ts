import express from 'express';
import { auth } from './auth.routes';

export const rotas = express.Router();

rotas.use('/auth', auth);
