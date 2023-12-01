import { auth_provider } from '@prisma/client';

export interface AuthProvidersRepository {
	findOrCreate(data: Partial<auth_provider>): Promise<auth_provider>;
}
