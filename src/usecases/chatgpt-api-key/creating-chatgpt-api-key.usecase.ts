import { ChatgptApiKeyRepository } from '../../repositories/interfaces/chatgpt-api-key.interface';
import { ApiError } from '../../types/api-error.types';

export type CreatingChatgptApiKeyRequest = {
	user_id: number;
	api_key: string;
	name: string;
};

export class CreatingChatgptApiKey {
	constructor(private chatgptApiKeyRepository: ChatgptApiKeyRepository) {}

	async execute({ user_id, api_key, name }: CreatingChatgptApiKeyRequest) {
		await validate({ user_id, api_key, name });

		const { api_key: _, ...rest } = await this.chatgptApiKeyRepository.create({
			api_key,
			name,
			user_id,
		});

		return rest;
	}
}

async function validate({
	user_id,
	api_key,
	name,
}: CreatingChatgptApiKeyRequest) {
	if (!user_id) {
		throw new ApiError(`Field user_id required`, 400);
	} else if (typeof user_id !== 'number') {
		throw new ApiError(`Field user_id must be a number`, 400);
	}

	if (!api_key) {
		throw new ApiError(`Field api_key required`, 400);
	} else if (typeof api_key !== 'string') {
		throw new ApiError(`Field api_key must be a string`, 400);
	}

	if (!name) {
		throw new ApiError(`Field name required`, 400);
	} else if (typeof name !== 'string') {
		throw new ApiError(`Field name must be a string`, 400);
	}
}
