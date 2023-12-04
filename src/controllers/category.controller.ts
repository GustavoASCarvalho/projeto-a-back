import { PrismaCategoryRepository } from '../repositories/prisma/category.repository.prisma';
import { ApiResponse } from '../types/api-response.types';
import { ListingCategories } from '../usecases/category/listing-categories.usecase';
import { Request, Response } from 'express';

export class CategoryController {
	public async list(_: Request, res: Response): Promise<Response> {
		const categoryRepository = new PrismaCategoryRepository();
		const listingCategories = new ListingCategories(categoryRepository);

		const templates = await listingCategories.execute();

		return res.status(200).json({
			message: `Listed ${templates.length} templates`,
			statusCode: 200,
			data: templates,
		} as ApiResponse);
	}
}
