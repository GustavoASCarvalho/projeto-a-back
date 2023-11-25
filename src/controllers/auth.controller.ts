import {
	AuthenticatingUser,
	AuthenticatingUserRequest,
} from '../usecases/user/authenticating-user.usecase';
import { Request, Response } from 'express';
import { ApiResponse } from '../types/api-response.types';
import { PrismaUserRepository } from '../repositories/prisma/user.repository.prisma';

export class AuthController {
	public async authenticate(req: Request, res: Response): Promise<Response> {
		const data: AuthenticatingUserRequest = req.body;
		const userRepository = new PrismaUserRepository();
		const authenticatingUser = new AuthenticatingUser(userRepository);

		const { token } = await authenticatingUser.execute(data);
		return res.status(200).json({
			message: `User authenticated successfully`,
			statusCode: 200,
			data: {
				jwe: token,
			},
		} as ApiResponse);
	}

	public async verify(req: Request, res: Response): Promise<Response> {
		return res.status(200).json({
			message: `User authenticated successfully`,
			statusCode: 200,
		} as ApiResponse);
	}
}
