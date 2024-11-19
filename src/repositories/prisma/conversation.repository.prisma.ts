import { prisma } from '../../prisma';
import { ConversationRepository } from '../interfaces/conversation.interface';
import { ConversationModel } from '../models/conversation.model';

export class PrismaConversationRepository implements ConversationRepository {
	async createWithMessages(
		template_history_id: number,
		user_id: number,
		messages: {
			chatgpt_api_key_id: number;
			message: string;
			response: string;
			response_timestamp: Date;
		}[],
	): Promise<ConversationModel> {
		const conversation = await prisma.conversation.create({
			data: {
				template_history_id,
				user_id,
				messages: {
					create: messages.map(message => ({
						chatgpt_api_key_id: message.chatgpt_api_key_id,
						message: message.message,
						response: message.response,
						response_timestamp: message.response_timestamp,
					})),
				},
			},
			include: {
				messages: true,
			},
		});
		return conversation;
	}

	findByUserIdAndTemplateHistoryId(
		user_id: number,
		template_history_id: number,
	): Promise<ConversationModel[]> {
		const conversations = prisma.conversation.findMany({
			where: {
				user_id,
				template_history_id,
			},
			include: {
				messages: true,
			},
		});

		return conversations;
	}

	listByUserId(user_id: number): Promise<ConversationModel[]> {
		const conversations = prisma.conversation.findMany({
			where: {
				user_id,
			},
			include: {
				messages: true,
				template_history: {
					select: {
						name: true,
					},
				},
			},
		});

		return conversations;
	}

	findById(conversation_id: number): Promise<ConversationModel | null> {
		const conversation = prisma.conversation.findUnique({
			where: {
				conversation_id,
			},
			include: {
				messages: true,
			},
		});

		return conversation;
	}
}
