import { variableTypeEnum } from './enum/variable-type.enum';

export type VariableModel = {
	variable_id: number;
	name: string;
	value: string;
	placeholder: string;
	tip: string;
	template_id: number | null;
	type: variableTypeEnum;
	template_history_id: number | null;
};
