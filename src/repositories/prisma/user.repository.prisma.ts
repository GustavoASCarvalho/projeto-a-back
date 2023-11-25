import { user } from '@prisma/client';
import { prisma } from '../../prisma';
import { UserRepository } from '../interfaces/user.interface';

export class PrismaUserRepository implements UserRepository {
	async findById(id: number): Promise<user | null> {
		return await prisma.user.findUnique({
			where: {
				user_id: id,
			},
		});
	}

	async findByEmail(email: string): Promise<user | null> {
		return await prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	async create(data: user): Promise<user> {
		return await prisma.user.create({
			data,
		});
	}

	async findOrCreate(data: user): Promise<user> {
		return await prisma.user.upsert({
			where: {
				email: data.email,
			},
			update: {},
			create: data,
		});
	}
}
