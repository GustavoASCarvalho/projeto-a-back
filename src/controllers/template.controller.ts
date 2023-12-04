import { PrismaTemplateRepository } from '../repositories/prisma/template.repository.prisma';
import { ApiResponse } from '../types/api-response.types';
import {
	CreatingTemplate,
	CreatingTemplateRequest,
} from '../usecases/template/creating-template.usecase';
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
}
