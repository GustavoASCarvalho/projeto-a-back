import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { ChatgptApiKeyRepository } from '../../repositories/interfaces/chatgpt-api-key.interface';
import { ConversationRepository } from '../../repositories/interfaces/conversation.interface';
import { MessageRepository } from '../../repositories/interfaces/message.interface';
import { TemplateRepository } from '../../repositories/interfaces/template.interface';
import { ChatGptService } from '../../services/chat-gpt.service';
import { ApiError } from '../../types/api-error.types';

export type CreatingMessageRequest = {
	user_id: number;
	slug: string;
	chat_gpt_api_key_id: number;
	conversation_id: number;
	message: string;
};

export class CreatingMessage {
	constructor(
		private templateRepository: TemplateRepository,
		private chatgptApiKeyRepository: ChatgptApiKeyRepository,
		private conversationRepository: ConversationRepository,
		private chatGptService: ChatGptService,
		private messageRepository: MessageRepository,
	) {}

	async execute({
		user_id,
		chat_gpt_api_key_id,
		slug,
		conversation_id,
		message,
	}: CreatingMessageRequest) {
		await validate({
			user_id,
			chat_gpt_api_key_id,
			slug,
			conversation_id,
			message,
		});
		//validar se os valores batem com as variaveis do template

		const messageTimestamp = new Date();

		const template = await this.templateRepository.getBySlug(slug);

		const mostRecentTemplateHistory = template?.template_history?.reduce(
			(prev, current) => {
				return prev.created_at > current.created_at ? prev : current;
			},
		);

		if (!mostRecentTemplateHistory) {
			throw new ApiError(`Template history not found`, 404);
		}

		const apiKey = await this.chatgptApiKeyRepository.getById(
			chat_gpt_api_key_id,
		);

		if (!apiKey) {
			throw new ApiError(`ChatGPT API Key not found`, 404);
		}

		const conversations = await this.conversationRepository.findById(
			conversation_id,
		);

		if (!conversations) {
			throw new ApiError(`Conversation not found`, 404);
		}

		console.log('conversations', conversations);

		let messages = conversations
			.messages!.map(m => {
				return [
					{
						role: 'user',
						content: m.message ?? '',
					},
					{
						role: 'assistant',
						content: m.response ?? '',
					},
				];
			})
			.flat();

		messages.push({
			role: 'user',
			content: message,
		});

		const completion = await this.chatGptService.getCompletation(
			apiKey.api_key,
			messages as ChatCompletionMessageParam[],
		);

		console.log('completion', completion);

		const newMessage = await this.messageRepository.create({
			chatgpt_api_key_id: chat_gpt_api_key_id,
			message: message,
			conversation_id: conversation_id,
			response: completion.content,
			message_timestamp: new Date(),
			response_timestamp: messageTimestamp,
		});

		return newMessage;
	}
}

async function validate({
	chat_gpt_api_key_id,
	slug,
	conversation_id,
	message,
}: CreatingMessageRequest) {
	if (!chat_gpt_api_key_id) {
		throw new ApiError(`Field chat_gpt_api_key_id required`, 400);
	} else if (typeof chat_gpt_api_key_id !== 'number') {
		throw new ApiError(`Field chat_gpt_api_key_id must be a number`, 400);
	}

	if (!conversation_id) {
		throw new ApiError(`Field conversation_id required`, 400);
	} else if (typeof conversation_id !== 'number') {
		throw new ApiError(`Field conversation_id must be a number`, 400);
	}

	if (!slug) {
		throw new ApiError(`Field slug required`, 400);
	} else if (typeof slug !== 'string') {
		throw new ApiError(`Field slug must be a number`, 400);
	}

	if (!message) {
		throw new ApiError(`Field message required`, 400);
	} else if (typeof message !== 'string') {
		throw new ApiError(`Field message must be a number`, 400);
	}
}
