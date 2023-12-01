import { UserController } from './../controllers/user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import express from 'express';

export const user = express.Router();

const userController = new UserController();
const authMiddleware = new AuthMiddleware();

user.use(authMiddleware.middleware);
user.get('', userController.get);
