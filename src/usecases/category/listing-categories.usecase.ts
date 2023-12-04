import { CategoryRepository } from '../../repositories/interfaces/category.interface';

export class ListingCategories {
	constructor(private categoryRepository: CategoryRepository) {}

	async execute() {
		return await this.categoryRepository.list();
	}
}
