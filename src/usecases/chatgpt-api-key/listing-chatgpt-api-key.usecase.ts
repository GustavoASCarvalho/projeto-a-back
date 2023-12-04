import { ChatgptApiKeyRepository } from '../../repositories/interfaces/chatgpt-api-key.interface';
import { ApiError } from '../../types/api-error.types';

export type ListingChatgptApiKeyRequest = {
	user_id: number;
};

export class ListingChatgptApiKey {
	constructor(private chatgptApiKeyRepository: ChatgptApiKeyRepository) {}

	async execute({ user_id }: ListingChatgptApiKeyRequest) {
		await validate({ user_id });

		return (await this.chatgptApiKeyRepository.list(user_id)).map(
			({ api_key, ...rest }) => rest,
		);
	}
}

async function validate({ user_id }: ListingChatgptApiKeyRequest) {
	if (!user_id) {
		throw new ApiError(`Field user_id required`, 400);
	} else if (typeof user_id !== 'number') {
		throw new ApiError(`Field user_id must be a number`, 400);
	}
}
