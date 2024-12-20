import { Request, Response } from 'express';
import { PrismaChatgptApiKeyRepository } from '../repositories/prisma/chatgpt-api-key.repository.prisma';
import { PrismaConversationRepository } from '../repositories/prisma/conversation.repository.prisma';
import { PrismaTemplateRepository } from '../repositories/prisma/template.repository.prisma';
import { ChatGptService } from '../services/chat-gpt.service';
import { ApiResponse } from '../types/api-response.types';
import {
	CreatingConversation,
	CreatingConversationRequest,
} from '../usecases/conversation/creating-conversation.usecase';
import { ListingConversations } from './../usecases/conversation/listing-conversations.usecase';

export class ConversationController {
	public async create(req: Request, res: Response): Promise<Response> {
		const data: CreatingConversationRequest = req.body;
		const user_id = res.locals.id;

		const templateRepository = new PrismaTemplateRepository();
		const chatgptApiKeyRepository = new PrismaChatgptApiKeyRepository();
		const conversationRepository = new PrismaConversationRepository();
		const chatGptService = new ChatGptService();
		const creatingConversation = new CreatingConversation(
			templateRepository,
			chatgptApiKeyRepository,
			conversationRepository,
			chatGptService,
		);

		const result = await creatingConversation.execute({ ...data, user_id });

		return res.status(200).json({
			message: `Completado com sucesso`,
			statusCode: 200,
			data: result,
		} as ApiResponse);
	}

	public async list(req: Request, res: Response): Promise<Response> {
		const user_id = res.locals.id;
		const conversationRepository = new PrismaConversationRepository();
		const listingConversations = new ListingConversations(
			conversationRepository,
		);

		const result = await listingConversations.execute({ user_id });

		return res.status(200).json({
			message: `Listado com sucesso`,
			statusCode: 200,
			data: result,
		} as ApiResponse);
	}
}
