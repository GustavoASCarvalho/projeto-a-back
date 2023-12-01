import { PrismaTemplateCategoryRepository } from '../repositories/prisma/template-category.repository.prisma';
import { ApiResponse } from '../types/api-response.types';
import { ListingTemplateCategory } from '../usecases/template-category/listing-template-category.usecase';
import { Request, Response } from 'express';

export class TemplateCategoryController {
	public async list(_: Request, res: Response): Promise<Response> {
		const templateCategoryRepository = new PrismaTemplateCategoryRepository();
		const listingTemplatesCategory = new ListingTemplateCategory(
			templateCategoryRepository,
		);

		const templates = await listingTemplatesCategory.execute();

		return res.status(200).json({
			message: `Listed ${templates.length} templates`,
			statusCode: 200,
			data: templates,
		} as ApiResponse);
	}
}
