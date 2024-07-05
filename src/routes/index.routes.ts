import express from 'express';
import { auth } from './auth.routes';
import { category } from './category.routes';
import { chatgptApiKey } from './chatgpt-api-key.routes';
import { conversation } from './conversation.routes';
import { template } from './template.routes';
import { user } from './user.routes';

export const rotas = express.Router();

rotas.use('/auth', auth);
rotas.use('/category', category);
rotas.use('/user', user);
rotas.use('/chatgpt-api-key', chatgptApiKey);
rotas.use('/template', template);
rotas.use('/conversation', conversation);
