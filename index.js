const prompt = 'Olá, {{nome}}! Seu saldo atual é {{saldo}}.';

const regex = /\{\{(\w+)\}\}/g;
const matches = prompt.match(regex);

// Validar cada variável encontrada
if (matches) {
	for (const match of matches) {
		const variableName = match.slice(2, -2); // Remover {{ e }}

		console.log(`A variável ${variableName} é válida.`);
	}
}
