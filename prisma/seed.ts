import { PrismaClient } from '@prisma/client';
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
