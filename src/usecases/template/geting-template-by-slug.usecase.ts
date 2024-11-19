import { ConversationRepository } from '../../repositories/interfaces/conversation.interface';
import { TemplateRepository } from '../../repositories/interfaces/template.interface';
import { ApiError } from '../../types/api-error.types';
import { UserRepository } from './../../repositories/interfaces/user.interface';

export type GetingTemplateRequest = {
	slug: string;
	user_id: number;
};
export class GetingTemplate {
	constructor(
		private templateRepository: TemplateRepository,
		private userRepository: UserRepository,
		private conversationRepository: ConversationRepository,
	) {}

	async execute({ slug, user_id }: GetingTemplateRequest) {
		await validate({
			slug,
			user_id,
		});
		const template = await this.templateRepository.getBySlug(slug);
		if (
			!template ||
			!template.template_history ||
			!template.template_history[0]
		) {
			throw new ApiError(`Template not found`, 404);
		}

		const lastTemplateHistoryId =
			template.template_history[0].template_history_id;

		if (!lastTemplateHistoryId) {
			throw new ApiError(`Template not found`, 404);
		}

		let conversations =
			await this.conversationRepository.findByUserIdAndTemplateHistoryId(
				user_id,
				lastTemplateHistoryId,
			);

		conversations.forEach(conversation => {
			if (conversation.messages && conversation.messages.length > 0) {
				conversation.messages[0].message = '';
			}
		});

		template.template_history[0]['conversations'] = conversations;

		if (template.visibility === 'PRIVATE') {
			const user = await this.userRepository.findById(user_id);
			if (user) {
				if (user.user_id === template.user_id) {
					return template;
				} else {
					throw new ApiError(`Template not found`, 404);
				}
			} else {
				throw new ApiError(`User not found`, 404);
			}
		}

		return template;
	}
}

async function validate({ slug, user_id }: GetingTemplateRequest) {
	if (!slug) {
		throw new ApiError(`Field   slug required`, 400);
	} else if (typeof slug !== 'string') {
		throw new ApiError(`Field   slug must be a number`, 400);
	}
	if (!user_id) {
		throw new ApiError(`Field user_id required`, 400);
	} else if (typeof user_id !== 'number') {
		throw new ApiError(`Field user_id must be a number`, 400);
	}
}
