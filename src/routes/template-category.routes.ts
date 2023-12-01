import { TemplateCategoryController } from '../controllers/template-category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import express from 'express';

export const templateCategory = express.Router();

const templateController = new TemplateCategoryController();
const authMiddleware = new AuthMiddleware();

templateCategory.use(authMiddleware.middleware);
templateCategory.get('/list', templateController.list);
