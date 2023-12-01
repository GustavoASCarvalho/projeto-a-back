import { TemplateCategoryRepository } from '../../repositories/interfaces/template-category.interface';

export class ListingTemplateCategory {
	constructor(private templateRepository: TemplateCategoryRepository) {}

	async execute() {
		return await this.templateRepository.list();
	}
}
