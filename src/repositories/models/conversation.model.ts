import { MessageModel } from './message.model';

export interface ConversationModel {
	conversation_id: number;
	template_history_id: number;
	user_id: number;
	messages?: MessageModel[];
}
