import { category } from '@prisma/client';
import { prisma } from '../../prisma';
import { CategoryRepository } from '../interfaces/category.interface';

export class PrismaCategoryRepository implements CategoryRepository {
	async list(): Promise<category[]> {
		return await prisma.category.findMany();
	}
}
