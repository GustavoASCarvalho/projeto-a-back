import { ChatgptApiKeyRepository } from '../../repositories/interfaces/chatgpt-api-key.interface';
import { ConversationRepository } from '../../repositories/interfaces/conversation.interface';
import { TemplateRepository } from '../../repositories/interfaces/template.interface';
import { ChatGptService } from '../../services/chat-gpt.service';
import { ApiError } from '../../types/api-error.types';

export type CreatingConversationRequest = {
	user_id: number;
	slug: string;
	chat_gpt_api_key_id: number;
	variables: Array<{
		name: string;
		value: string;
		realName: string;
	}>;
};

export class CreatingConversation {
	constructor(
		private templateRepository: TemplateRepository,
		private chatgptApiKeyRepository: ChatgptApiKeyRepository,
		private conversationRepository: ConversationRepository,
		private chatGptService: ChatGptService,
	) {}

	async execute({
		user_id,
		chat_gpt_api_key_id,
		variables,
		slug,
	}: CreatingConversationRequest) {
		await validate({ user_id, chat_gpt_api_key_id, variables, slug });
		//validar se os valores batem com as variaveis do template

		const promptTime = Date.now();

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

		let prompt = mostRecentTemplateHistory.prompt;

		variables.forEach(variable => {
			prompt = prompt.replace(`{{${variable.realName}}}`, variable.value);
		});
		const completion = await this.chatGptService.getCompletation(
			apiKey.api_key,
			[
				{
					role: 'user',
					content: prompt,
				},
			],
		);

		let conversation = await this.conversationRepository.createWithMessages(
			mostRecentTemplateHistory.template_history_id,
			user_id,
			[
				{
					chatgpt_api_key_id: chat_gpt_api_key_id,
					message: prompt,
					response: completion.content ?? '',
					response_timestamp: new Date(),
				},
			],
		);

		conversation.messages![0].message = '';

		return conversation;
	}
}

async function validate({
	chat_gpt_api_key_id,
	variables,
	slug,
}: CreatingConversationRequest) {
	if (!chat_gpt_api_key_id) {
		throw new ApiError(`Field chat_gpt_api_key_id required`, 400);
	} else if (typeof chat_gpt_api_key_id !== 'number') {
		throw new ApiError(`Field chat_gpt_api_key_id must be a number`, 400);
	}

	if (!slug) {
		throw new ApiError(`Field slug required`, 400);
	} else if (typeof slug !== 'string') {
		throw new ApiError(`Field slug must be a number`, 400);
	}

	if (!variables) throw new ApiError(`Field variables required`, 400);
	variables.forEach(variable => {
		if (typeof variable.name !== 'string')
			throw new ApiError(`Field variable.name must be a string`, 400);

		if (typeof variable.value !== 'string')
			throw new ApiError(`Field variable.value must be a string`, 400);

		if (typeof variable.realName !== 'string')
			throw new ApiError(`Field variable.realName must be a string`, 400);
	});
}
