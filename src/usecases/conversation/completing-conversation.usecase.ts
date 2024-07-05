import { TemplateRepository } from '../../repositories/interfaces/template.interface';
import { ApiError } from '../../types/api-error.types';

export type CompletingConversationRequest = {
	slug: string;
	chat_gpt_api_key_id: number;
	variables: Array<{
		name: string;
		value: string;
	}>;
};

export class CompletingConversation {
	constructor(private templateRepository: TemplateRepository) {}

	async execute({
		chat_gpt_api_key_id,
		variables,
		slug,
	}: CompletingConversationRequest) {
		await validate({ chat_gpt_api_key_id, variables, slug });

		// verificar se o slug existe, e se o usuario tem permissao para acessar (ou é dono do template, ou é um template publico)
		// verificar se o chat_gpt_api_key_id existe
		// verificar se as variaveis existem no template

		// const data = await this.templateRepository.create({
		// 	api_key,
		// 	name,
		// 	user_id,
		// });

		return null;
	}
}

async function validate({
	chat_gpt_api_key_id,
	variables,
	slug,
}: CompletingConversationRequest) {
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
	});
}
