import { TemplateController } from '../controllers/template.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import express from 'express';

export const template = express.Router();

const authMiddleware = new AuthMiddleware();

const templateController = new TemplateController();

template.use(authMiddleware.middleware);
template.post('/', templateController.create);
template.get('/', templateController.list);
template.get('/:slug', templateController.getBySlug);
