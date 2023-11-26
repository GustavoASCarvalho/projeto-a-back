import { UserRepository } from '../../repositories/interfaces/user.interface';
import { ApiError } from '../../types/api-error.types';
import dayjs from 'dayjs';
import { JWE } from '../../utils/jwe.utils';
import bcrypt from 'bcrypt';
import { AuthProvidersRepository } from '../../repositories/interfaces/auth-providers.interface';

export type RegisteringUserRequest = {
	email: string;
	password: string;
};

export class RegisteringUser {
	constructor(
		private userRepository: UserRepository,
		private authProvidersRepository: AuthProvidersRepository,
	) {}

	async execute({ email, password }: RegisteringUserRequest) {
		await validate({ email, password });

		const user = await this.userRepository.findOrCreate({
			email,
			password_hash: bcrypt.hashSync(password, 10),
		});

		await this.authProvidersRepository.findOrCreate({
			user_id: user.user_id,
			provider_names_id: 1, // Credentials
			provider_user_id: user.user_id.toString(),
		});

		const token = await new JWE().encrypt({
			id: user.user_id,
			iat: dayjs().unix(),
			exp: dayjs().add(8, 'hours').unix(),
		});

		return { token };
	}
}

async function validate({ email, password }: RegisteringUserRequest) {
	if (!email) {
		throw new ApiError(`Field email required `, 400);
	} else if (typeof email !== 'string') {
		throw new ApiError(`Field email must be a string`, 400);
	} else if (
		!email.includes('@') ||
		!email.includes('.') ||
		email.length < 5 ||
		email.length > 255 ||
		email.includes(' ') ||
		email.includes('@.') ||
		email.includes('.@') ||
		email.includes('..')
	) {
		throw new ApiError(`Field email invalid`, 400);
	}
	if (!password) {
		throw new ApiError(`Field password required`, 400);
	} else if (typeof password !== 'string') {
		throw new ApiError(`Field password must be a string`, 400);
	}
}
