import express from 'express';
import { auth } from './auth.routes';
import { category } from './category.routes';
import { user } from './user.routes';
import { chatgptApiKey } from './chatgpt-api-key.routes';
import { template } from './template.routes';

export const rotas = express.Router();

rotas.use('/auth', auth);
rotas.use('/category', category);
rotas.use('/user', user);
rotas.use('/chatgpt-api-key', chatgptApiKey);
rotas.use('/template', template);
