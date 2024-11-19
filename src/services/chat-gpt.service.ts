import OpenAI from 'openai';
import { ApiError } from '../types/api-error.types';

export class ChatGptService {
	async getCompletation(
		chatgpt_api_key: string,
		messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
	) {
		try {
			const openai = new OpenAI({ apiKey: chatgpt_api_key });
			const completion = await openai.chat.completions.create({
				model: 'gpt-4o-mini',
				messages,
			});

			console.log('completion', completion);

			return completion.choices[0].message;
		} catch (error) {
			console.log(error);
			throw new ApiError('Error on openai completion', 500);
		}
	}
}
