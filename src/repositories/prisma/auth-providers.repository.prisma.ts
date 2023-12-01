import { auth_provider } from '@prisma/client';
import { AuthProvidersRepository } from '../interfaces/auth-providers.interface';
import { prisma } from '../../prisma';

export class PrismaAuthProvidersRepository implements AuthProvidersRepository {
	async findOrCreate(data: auth_provider): Promise<auth_provider> {
		return await prisma.auth_provider.upsert({
			where: {
				user_id: data.user_id,
			},
			update: {},
			create: data,
		});
	}
}
