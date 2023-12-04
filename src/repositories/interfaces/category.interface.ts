import { category } from '@prisma/client';

export interface CategoryRepository {
	list(): Promise<category[]>;
}
