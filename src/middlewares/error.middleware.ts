import { NextFunction, Request, Response } from 'express';
import { env } from '../env';
import { ApiError } from '../types/api-error.types';
import { ApiResponse } from '../types/api-response.types';

export class ErrorMiddleware {
	async middleware(
		error: Error | ApiError,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) {
		if (env.NODE_ENV === 'development') {
			console.log(`---- error message ----`);
			console.log(error.message);
			console.log(`----  error stack  ----`);
			console.log(error.stack);
		}
		if (error instanceof ApiError) {
			return res.status(error.statusCode).json({
				message: error.message,
				statusCode: error.statusCode,
			} as ApiResponse);
		}
		return res.status(500).json({
			message: 'Erro interno do servidor',
			statusCode: 500,
		} as ApiResponse);
	}
}
