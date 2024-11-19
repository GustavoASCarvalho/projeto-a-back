import { message } from '@prisma/client';
import { prisma } from '../../prisma';
import { MessageRepository } from '../interfaces/message.interface';

export class PrismaMessageRepository implements MessageRepository {
	async create(data: Omit<message, 'message_id'>): Promise<message> {
		return await prisma.message.create({
			data: data,
		});
	}
}
