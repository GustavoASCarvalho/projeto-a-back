import { PrismaTemplateRepository } from '../repositories/prisma/template.repository.prisma';
import { PrismaUserRepository } from '../repositories/prisma/user.repository.prisma';
import { ApiResponse } from '../types/api-response.types';
import {
	CreatingTemplate,
	CreatingTemplateRequest,
} from '../usecases/template/creating-template.usecase';
import { ListingTemplate } from '../usecases/template/listing-templates.usecase';
import {
	GetingTemplate,
	GetingTemplateRequest,
} from '../usecases/template/geting-template-by-slug.usecase';
import { Request, Response } from 'express';

export class TemplateController {
	public async create(req: Request, res: Response): Promise<Response> {
		const user_id = res.locals.id;
		const data: Omit<CreatingTemplateRequest, 'user_id'> = req.body;
		const templateRepository = new PrismaTemplateRepository();
		const creatingTemplate = new CreatingTemplate(templateRepository);

		const templates = await creatingTemplate.execute({ ...data, user_id });

		return res.status(200).json({
			message: `Template created successfully`,
			statusCode: 200,
			data: templates,
		} as ApiResponse);
	}

	public async list(_: Request, res: Response): Promise<Response> {
		const templateRepository = new PrismaTemplateRepository();
		const listingTemplate = new ListingTemplate(templateRepository);

		const templates = await listingTemplate.execute();

		if (!templates) {
			return res.status(404).json({
				message: `Templates not found`,
				statusCode: 404,
			} as ApiResponse);
		}

		return res.status(200).json({
			message: `Templates listed successfully`,
			statusCode: 200,
			data: templates,
		} as ApiResponse);
	}

	public async getBySlug(req: Request, res: Response): Promise<Response> {
		const { slug } = req.params;
		const id = res.locals.id;
		const data: GetingTemplateRequest = { slug, user_id: id };
		const userRepository = new PrismaUserRepository();
		const templateRepository = new PrismaTemplateRepository();
		const getingTemplate = new GetingTemplate(
			templateRepository,
			userRepository,
		);
		const template = await getingTemplate.execute(data);

		if (!template) {
			return res.status(404).json({
				message: `Template not found`,
				statusCode: 404,
			} as ApiResponse);
		}

		return res.status(200).json({
			message: `Template listed successfully`,
			statusCode: 200,
			data: template,
		} as ApiResponse);
	}
}
