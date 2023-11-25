import { UserRepository } from '../../repositories/interfaces/user.interface';
import { ApiError } from '../../types/api-error.types';
import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { JWE } from '../../utils/jwe.utils';

export type AuthenticatingUserRequest = {
	email: string;
	password: string;
};

export class AuthenticatingUser {
	constructor(private userRepository: UserRepository) {}

	async execute({ email, password }: AuthenticatingUserRequest) {
		await validate({ email, password });

		const user = await this.userRepository.findByEmail(email);

		if (!user || !user.password_hash) {
			throw new ApiError('Unauthorize', 401);
		}

		if (!(await bcrypt.compare(password, user.password_hash))) {
			throw new ApiError('Unauthorize', 401);
		}

		const token = await new JWE().encrypt({
			id: user.user_id,
			iat: dayjs().unix(),
			exp: dayjs().add(8, 'hours').unix(),
		});

		return { token };
	}
}

async function validate({ email, password }: AuthenticatingUserRequest) {
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
