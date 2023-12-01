import { ApiError } from '../../types/api-error.types';
import { GoogleAuthService } from '../../services/google-auth.service';
import { JWE } from '../../utils/jwe.utils';
import { UserRepository } from '../../repositories/interfaces/user.interface';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { AuthProvidersRepository } from '../../repositories/interfaces/auth-providers.interface';

export type AuthenticatingGoogleUserRequest = {
	code: string;
};

export type GoogleUser = {
	email: string;
	name: string;
	picture: string;
	sub: string;
};

export class AuthenticatingGoogleUser {
	constructor(
		private userRepository: UserRepository,
		private authProvidersRepository: AuthProvidersRepository,
		private googleAuthService: GoogleAuthService,
	) {}

	async execute({ code }: AuthenticatingGoogleUserRequest) {
		await validate({ code });

		const { id_token } = await this.googleAuthService.getAccessToken(code);

		const googleUser = jwt.decode(id_token) as GoogleUser;

		if (!googleUser) {
			throw new ApiError('Unauthorize', 401);
		}

		await validateGoogleResponse({
			email: googleUser.email,
			name: googleUser.name,
			picture: googleUser.picture,
			sub: googleUser.sub,
		});

		const user = await this.userRepository.findOrCreate({
			email: googleUser.email,
			full_name: googleUser.name,
			photo_url: googleUser.picture,
		});

		await this.authProvidersRepository.findOrCreate({
			user_id: user.user_id,
			provider_names_id: 2, // Google
			provider_user_id: googleUser.sub,
		});

		if (!user) {
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

async function validate({ code }: AuthenticatingGoogleUserRequest) {
	if (!code) {
		throw new ApiError(`Field code required`, 400);
	} else if (typeof code !== 'string') {
		throw new ApiError(`Field code must be a string`, 400);
	}
}

async function validateGoogleResponse({
	email,
	name,
	picture,
	sub,
}: GoogleUser) {
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
	if (!name) {
		throw new ApiError(`Field name required`, 400);
	} else if (typeof name !== 'string') {
		throw new ApiError(`Field name must be a string`, 400);
	}
	if (!picture) {
		throw new ApiError(`Field picture required`, 400);
	} else if (typeof picture !== 'string') {
		throw new ApiError(`Field picture must be a string`, 400);
	}
	if (!sub) {
		throw new ApiError(`Field sub required`, 400);
	} else if (typeof sub !== 'string') {
		throw new ApiError(`Field sub must be a string`, 400);
	}
}
