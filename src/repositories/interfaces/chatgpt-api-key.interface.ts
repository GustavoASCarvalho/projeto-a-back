import { chatgpt_api_key } from '@prisma/client';

export interface ChatgptApiKeyRepository {
	create(data: {
		user_id: number;
		api_key: string;
		name: string;
	}): Promise<chatgpt_api_key>;
	list(user_id: number): Promise<chatgpt_api_key[]>;
	getById(id: number): Promise<chatgpt_api_key | null>;
}
