import { template, variable } from '@prisma/client';
import { prisma } from '../../prisma';
import { TemplateRepository } from '../interfaces/template.interface';

export class PrismaTemplateRepository implements TemplateRepository {
	async create(
		data: template,
		variables: variable[] | null,
	): Promise<template> {
		//TODO adicionar as categorias na criação do template
		const { user_id, ...rest } = data;
		return await prisma.template.create({
			data: {
				...data,
				template_history: {
					create: {
						...rest,
						...(variables && variables.length > 0
							? {
									variables: {
										createMany: {
											data: variables.map((variableData: variable) => {
												return { ...variableData };
											}),
										},
									},
							  }
							: {}),
					},
				},
				...(variables && variables.length > 0
					? {
							variables: {
								createMany: {
									data: variables.map((variableData: variable) => {
										return { ...variableData };
									}),
								},
							},
					  }
					: {}),
			},
		});
	}
}
