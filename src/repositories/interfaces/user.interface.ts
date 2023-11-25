import { user } from '@prisma/client';

export interface UserRepository {
	findById(id: number): Promise<user | null>;
	findByEmail(email: string): Promise<user | null>;
	findOrCreate(data: Partial<user>): Promise<user>;
	create(data: user): Promise<user>;
}
