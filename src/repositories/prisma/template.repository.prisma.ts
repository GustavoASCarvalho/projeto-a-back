import { template, variable } from '@prisma/client';
import { prisma } from '../../prisma';
import { TemplateRepository } from '../interfaces/template.interface';
import { TemplateModel } from '../models/template.model';

export class PrismaTemplateRepository implements TemplateRepository {
	async create(
		data: template,
		variables: variable[] | null,
		categories: number[],
	): Promise<template> {
		//TODO adicionar as categorias na criação do template
		const { user_id, ...rest } = data;
		const createdTemplate = await prisma.template.create({
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
			include: {
				template_history: true,
			},
		});

		const templateId = createdTemplate.template_id;
		const templateHistoryId =
			createdTemplate.template_history[0].template_history_id;

		await prisma.categories_on_template.createMany({
			data: categories.map((categoryId: number) => {
				return {
					template_id: templateId,
					category_id: categoryId,
				};
			}),
		});

		await prisma.categories_on_template_history.createMany({
			data: categories.map((categoryId: number) => {
				return {
					template_history_id: templateHistoryId,
					category_id: categoryId,
				};
			}),
		});

		return createdTemplate;
	}

	async list(): Promise<template[]> {
		return await prisma.template.findMany({
			where: {
				visibility: 'PUBLIC',
			},
			include: {
				template_history: true,
				categories_on_template: {
					include: {
						category: true,
					},
				},
			},
		});
	}
	async getBySlug(slug: string): Promise<TemplateModel | null> {
		return (await prisma.template.findFirst({
			where: {
				slug: slug,
			},
			include: {
				template_history: {
					include: {
						variables: true,
					},
				},
			},
		})) as TemplateModel;
	}
}
