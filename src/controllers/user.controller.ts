import { PrismaUserRepository } from '../repositories/prisma/user.repository.prisma';
import { ApiResponse } from '../types/api-response.types';
import { Request, Response } from 'express';
import { GetingUser } from '../usecases/user/geting-user.usecase';

export class UserController {
	public async get(_: Request, res: Response): Promise<Response> {
		const prismaUserRepository = new PrismaUserRepository();
		const getingUser = new GetingUser(prismaUserRepository);

		const user = await getingUser.execute(res.locals.id);

		if (!user) {
			return res.status(404).json({
				message: `Usuário não encontrado`,
				statusCode: 404,
			} as ApiResponse);
		}

		return res.status(200).json({
			message: `Usuário encontrado com sucesso`,
			statusCode: 200,
			data: user,
		} as ApiResponse);
	}
}
