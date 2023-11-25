import { auth_providers } from '@prisma/client';

export interface AuthProvidersRepository {
	findOrCreate(data: Partial<auth_providers>): Promise<auth_providers>;
}
