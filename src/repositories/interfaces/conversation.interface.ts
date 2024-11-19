import { ConversationModel } from '../models/conversation.model';

export interface ConversationRepository {
	createWithMessages(
		template_history_id: number,
		user_id: number,
		messages: {
			chatgpt_api_key_id: number;
			message: string;
			response: string;
			response_timestamp: Date;
		}[],
	): Promise<ConversationModel>;
	findByUserIdAndTemplateHistoryId(
		user_id: number,
		template_history_id: number,
	): Promise<ConversationModel[]>;

	listByUserId(user_id: number): Promise<ConversationModel[]>;

	findById(conversation_id: number): Promise<ConversationModel | null>;
}
