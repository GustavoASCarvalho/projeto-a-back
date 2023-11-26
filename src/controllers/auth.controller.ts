import {
	AuthenticatingUser,
	AuthenticatingUserRequest,
} from '../usecases/user/authenticating-user.usecase';
import {
	RegisteringUser,
	RegisteringUserRequest,
} from '../usecases/user/registering-user.usecase';
import { Request, Response } from 'express';
import { ApiResponse } from '../types/api-response.types';
import { PrismaUserRepository } from '../repositories/prisma/user.repository.prisma';
import { PrismaAuthProvidersRepository } from '../repositories/prisma/auth-providers.repository.prisma';
import { GoogleAuthService } from '../services/google-auth.service';
import { AuthenticatingGoogleUser } from '../usecases/user/authenticating-google-user.usecase';
import { env } from '../env';

export class AuthController {
	public async verify(_: Request, res: Response): Promise<Response> {
		return res.status(200).json({
			message: `User authenticated successfully`,
			statusCode: 200,
		} as ApiResponse);
	}

	public async register(req: Request, res: Response): Promise<Response> {
		const data: RegisteringUserRequest = req.body;
		const userRepository = new PrismaUserRepository();
		const authProvidersRepository = new PrismaAuthProvidersRepository();
		const registeringUser = new RegisteringUser(
			userRepository,
			authProvidersRepository,
		);

		const { token } = await registeringUser.execute(data);

		return res.status(200).json({
			message: `User authenticated successfully`,
			statusCode: 200,
			data: {
				jwe: token,
			},
		} as ApiResponse);
	}

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

	public async google(req: Request, res: Response): Promise<void> {
		const code = req.query.code as string;

		const googleAuthService = new GoogleAuthService();
		const userRepository = new PrismaUserRepository();
		const authProvidersRepository = new PrismaAuthProvidersRepository();
		const authenticatingUser = new AuthenticatingGoogleUser(
			userRepository,
			authProvidersRepository,
			googleAuthService,
		);

		const { token } = await authenticatingUser.execute({ code });
		const eightHours = 8 * 60 * 60 * 1000;

		res.cookie('token', token, { maxAge: eightHours });

		return res.redirect(`${env.FRONTEND_URL}/home`);
	}
}
