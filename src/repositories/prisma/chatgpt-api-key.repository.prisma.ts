import { chatgpt_api_key } from '@prisma/client';
import { prisma } from '../../prisma';
import { ChatgptApiKeyRepository } from '../interfaces/chatgpt-api-key.interface';

export class PrismaChatgptApiKeyRepository implements ChatgptApiKeyRepository {
	async list(user_id: number): Promise<chatgpt_api_key[]> {
		return await prisma.chatgpt_api_key.findMany({
			where: {
				user_id: user_id,
			},
		});
	}

	async create(
		data: Omit<chatgpt_api_key, 'chatgpt_api_key_id | created_at'>,
	): Promise<chatgpt_api_key> {
		return await prisma.chatgpt_api_key.create({
			data: {
				user_id: data.user_id,
				api_key: data.api_key,
				name: data.name,
			},
		});
	}

	getById(id: number): Promise<chatgpt_api_key | null> {
		return prisma.chatgpt_api_key.findUnique({
			where: {
				chatgpt_api_key_id: id,
			},
		});
	}
}
