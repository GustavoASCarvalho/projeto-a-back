import { CategoryController } from '../controllers/category.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import express from 'express';

export const category = express.Router();

const authMiddleware = new AuthMiddleware();

const templateController = new CategoryController();

category.use(authMiddleware.middleware);
category.get('/list', templateController.list);
