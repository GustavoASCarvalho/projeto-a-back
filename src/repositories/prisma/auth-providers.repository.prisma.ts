import { auth_providers } from '@prisma/client';
import { AuthProvidersRepository } from '../interfaces/auth-providers.interface';
import { prisma } from '../../prisma';

export class PrismaAuthProvidersRepository implements AuthProvidersRepository {
	async findOrCreate(data: auth_providers): Promise<auth_providers> {
		return await prisma.auth_providers.upsert({
			where: {
				user_id: data.user_id,
			},
			update: {},
			create: data,
		});
	}
}
