import { ConversationRepository } from '../../repositories/interfaces/conversation.interface';

export type ListingConversationsRequest = {
	user_id: number;
};

export class ListingConversations {
	constructor(private conversationRepository: ConversationRepository) {}

	async execute({ user_id }: ListingConversationsRequest) {
		let conversations = await this.conversationRepository.listByUserId(user_id);
		conversations.forEach(c => {
			if (c.messages) c.messages[0].message = '';
		});

		// ordenar por data de ultima mensagem
		conversations = conversations.sort((a, b) => {
			if (a.messages && b.messages) {
				const lastMessageA = a.messages[a.messages.length - 1];
				const lastMessageB = b.messages[b.messages.length - 1];
				return (
					lastMessageB.message_timestamp.getTime() -
					lastMessageA.message_timestamp.getTime()
				);
			}
			return 0;
		});

		console.log(conversations);

		return conversations;
	}
}
