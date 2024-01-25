import { TemplateRepository } from '../../repositories/interfaces/template.interface';

export class ListingTemplate {
	constructor(private templateRepository: TemplateRepository) {}

	async execute() {
		return await this.templateRepository.list();
	}
}
