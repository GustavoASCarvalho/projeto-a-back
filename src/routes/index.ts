import express from 'express';
import { auth } from './auth.routes';
import { templateCategory } from './template-category.routes';
import { user } from './user.routes';

export const rotas = express.Router();

rotas.use('/auth', auth);
rotas.use('/template', templateCategory);
rotas.use('/user', user);
