import { UserController } from './../controllers/user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import express from 'express';

export const user = express.Router();

const authMiddleware = new AuthMiddleware();

const userController = new UserController();

user.use(authMiddleware.middleware);
user.get('/', userController.get);
