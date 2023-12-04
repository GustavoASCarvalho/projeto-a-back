import { PrismaChatgptApiKeyRepository } from '../repositories/prisma/chatgpt-api-key.repository.prisma';
import { ApiResponse } from '../types/api-response.types';
import {
	CreatingChatgptApiKey,
	CreatingChatgptApiKeyRequest,
} from '../usecases/chatgpt-api-key/creating-chatgpt-api-key.usecase';
import { Request, Response } from 'express';
import { ListingChatgptApiKey } from '../usecases/chatgpt-api-key/listing-chatgpt-api-key.usecase';

export class ChatgptApiKeyController {
	public async create(req: Request, res: Response): Promise<Response> {
		const id = res.locals.id;
		const data: Omit<CreatingChatgptApiKeyRequest, 'user_id'> = req.body;
		const chatgptApiKeyRepository = new PrismaChatgptApiKeyRepository();
		const creatingChatgptApiKey = new CreatingChatgptApiKey(
			chatgptApiKeyRepository,
		);

		await creatingChatgptApiKey.execute({
			api_key: data.api_key,
			name: data.name,
			user_id: id,
		});

		return res.status(200).json({
			message: `ChatgptApiKey created successfully`,
			statusCode: 200,
		} as ApiResponse);
	}

	public async list(_: Request, res: Response): Promise<Response> {
		const id = res.locals.id;
		const chatgptApiKeyRepository = new PrismaChatgptApiKeyRepository();
		const listingChatgptApiKey = new ListingChatgptApiKey(
			chatgptApiKeyRepository,
		);

		const keys = await listingChatgptApiKey.execute({
			user_id: id,
		});

		return res.status(200).json({
			message: `ChatgptApiKey listed successfully`,
			statusCode: 200,
			data: keys,
		} as ApiResponse);
	}
}
