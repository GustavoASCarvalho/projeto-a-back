import { ConversationModel } from './conversation.model';
import { VisibilityEnum } from './enum/visibility.enum';
import { VariableModel } from './variable.model';

export interface TemplateHistoryModel {
	template_history_id: number;
	name: string;
	description: string;
	prompt: string;
	logo_url: string;
	visibility: VisibilityEnum;
	created_at: Date;
	template_id: number;
	variables?: VariableModel[];
	conversations?: ConversationModel[];
}
