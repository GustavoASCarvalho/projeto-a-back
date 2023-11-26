import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
	await prisma.provider_names.createMany({
		data: [
			{
				name: 'credentials',
				provider_names_id: 1,
			},
			{
				name: 'google',
				provider_names_id: 2,
			},
		],
	});

	await prisma.user
		.create({
			data: {
				email: 'teste@teste.com',
				full_name: 'teste da silva',
				password_hash: bcrypt.hashSync('123456', 10),
			},
		})
		.then(async user => {
			await prisma.auth_providers.create({
				data: {
					provider_user_id: user.user_id.toString(),
					user_id: user.user_id,
					provider_names_id: 1, // credentials
				},
			});
		});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
