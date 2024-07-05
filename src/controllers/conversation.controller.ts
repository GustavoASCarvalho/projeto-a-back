import { Request, Response } from 'express';
import { ApiResponse } from '../types/api-response.types';
import { CompletingConversation } from '../usecases/conversation/completing-conversation.usecase';

export class ConversationController {
	public async complete(req: Request, res: Response): Promise<Response> {
		const data: CompletingConversation = req.body;

		console.log(data);

		return res.status(200).json({
			message: `Completado com sucesso`,
			statusCode: 200,
			data: 'data',
		} as ApiResponse);
	}
}
