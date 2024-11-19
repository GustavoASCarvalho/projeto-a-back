import { VisibilityEnum } from './enum/visibility.enum';
import { TemplateHistoryModel } from './template-history.model';

export interface TemplateModel {
	template_id: number;
	slug: string;
	user_id: number;
	logo_url: string;
	name: string;
	description: string;
	prompt: string;
	visibility: VisibilityEnum;
	created_at: Date;
	updated_at: Date;
	template_history?: TemplateHistoryModel[];
}
