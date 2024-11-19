import { Request, Response } from 'express';
import { PrismaChatgptApiKeyRepository } from '../repositories/prisma/chatgpt-api-key.repository.prisma';
import { PrismaConversationRepository } from '../repositories/prisma/conversation.repository.prisma';
import { PrismaMessageRepository } from '../repositories/prisma/message.repository.prisma';
import { PrismaTemplateRepository } from '../repositories/prisma/template.repository.prisma';
import { ChatGptService } from '../services/chat-gpt.service';
import { ApiResponse } from '../types/api-response.types';
import {
	CreatingMessage,
	CreatingMessageRequest,
} from '../usecases/message/creating-message.usecase';

export class MessageController {
	public async create(req: Request, res: Response): Promise<Response> {
		const data: CreatingMessageRequest = req.body;
		const user_id = res.locals.id;

		const templateRepository = new PrismaTemplateRepository();
		const chatgptApiKeyRepository = new PrismaChatgptApiKeyRepository();
		const messageRepository = new PrismaMessageRepository();
		const conversationRepository = new PrismaConversationRepository();
		const chatGptService = new ChatGptService();
		const creatingMessage = new CreatingMessage(
			templateRepository,
			chatgptApiKeyRepository,
			conversationRepository,
			chatGptService,
			messageRepository,
		);

		const result = await creatingMessage.execute({ ...data, user_id });

		return res.status(200).json({
			message: `Completado com sucesso`,
			statusCode: 200,
			data: result,
		} as ApiResponse);
	}
}
