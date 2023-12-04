import { $Enums } from '@prisma/client';
import { TemplateRepository } from '../../repositories/interfaces/template.interface';
import { ApiError } from '../../types/api-error.types';

export type CreatingTemplateRequest = {
	user_id: number;
	name: string;
	description: string;
	prompt: string;
	visibility: $Enums.visibility;
	variables: [
		{
			name: string;
			placeholder: string;
			type: $Enums.variable_type;
			tip: string;
		},
	];
};

const visibilityValues = ['PUBLIC', 'PRIVATE', 'NOT_LISTED'];
const variablesValues = ['TEXT', 'STRING'];

export class CreatingTemplate {
	constructor(private templateRepository: TemplateRepository) {}

	async execute({
		user_id,
		name,
		description,
		prompt,
		visibility,
		variables,
	}: CreatingTemplateRequest) {
		await validate({
			user_id,
			name,
			description,
			prompt,
			visibility,
			variables,
		});
		return await this.templateRepository.create(
			{
				user_id,
				name,
				description,
				prompt,
				visibility,
			},
			variables,
		);
	}
}

async function validate({
	user_id,
	name,
	description,
	prompt,
	visibility,
	variables,
}: CreatingTemplateRequest) {
	if (!user_id) {
		throw new ApiError(`Field user_id required`, 400);
	} else if (typeof user_id !== 'number') {
		throw new ApiError(`Field user_id must be a number`, 400);
	}

	if (!name) {
		throw new ApiError(`Field name required`, 400);
	} else if (typeof name !== 'string') {
		throw new ApiError(`Field name must be a string`, 400);
	}

	if (!description) {
		throw new ApiError(`Field description required`, 400);
	} else if (typeof description !== 'string') {
		throw new ApiError(`Field description must be a string`, 400);
	}

	if (!prompt) {
		throw new ApiError(`Field prompt required`, 400);
	} else if (typeof prompt !== 'string') {
		throw new ApiError(`Field prompt must be a string`, 400);
	}

	if (!visibility) {
		throw new ApiError(`Field visibility required`, 400);
	} else if (!visibilityValues.includes(visibility)) {
		throw new ApiError(`Field visibility must be a valid enum`, 400);
	}

	const regex = /\{\{(\w+)\}\}/g;
	const matches = prompt.match(regex);
	const uniqueVariableNames = new Set();

	// Validar cada variável encontrada
	if (matches) {
		if (!variables) throw new ApiError(`Field variables required`, 400);
		if (matches.length !== variables.length) {
			throw new ApiError(
				`The number of variables in the prompt must be the same as in the variables array`,
				400,
			);
		}
		for (const match of matches) {
			const variableName = match.slice(2, -2);
			if (uniqueVariableNames.has(variableName)) {
				throw new ApiError(`Variable ${variableName} already exists`, 400);
			} else {
				uniqueVariableNames.add(variableName);
				// percorrer o array de variáveis e verificar se existe uma variável com o mesmo nome da variável encontrada, após isso verificar os campos da variável
				const variable = variables.find(
					variable => variable.name === variableName,
				);
				if (!variable)
					throw new ApiError(`Variable ${variableName} not found`, 400);
				if (!variable.placeholder)
					throw new ApiError(`Field placeholder required`, 400);
				if (typeof variable.placeholder !== 'string')
					throw new ApiError(`Field placeholder must be a string`, 400);
				if (!variable.tip) throw new ApiError(`Field tip required`, 400);
				if (typeof variable.tip !== 'string')
					throw new ApiError(`Field tip must be a string`, 400);
				if (!variable.type) throw new ApiError(`Field type required`, 400);
				if (!variablesValues.includes(variable.type))
					throw new ApiError(`Field type must be a valid enum`, 400);
			}
		}
	} else if (variables && variables.length > 0) {
		throw new ApiError(
			`The number of variables in the prompt must be the same as in the variables array`,
			400,
		);
	}
}
