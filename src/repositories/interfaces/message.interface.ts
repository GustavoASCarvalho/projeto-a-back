import { message } from '@prisma/client';

export interface MessageRepository {
	create(data: Omit<message, 'message_id'>): Promise<message>;
}
