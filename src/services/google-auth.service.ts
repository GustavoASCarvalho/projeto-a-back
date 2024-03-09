import axios from 'axios';
import qs from 'qs';
import { env } from '../env';
import { ApiError } from '../types/api-error.types';

export class GoogleAuthService {
	async getAccessToken(code: string) {
		const url = 'https://oauth2.googleapis.com/token';

		const values = {
			code,
			client_id: env.GOOGLE_CLIENT_ID,
			client_secret: env.GOOGLE_CLIENT_SECRET,
			redirect_uri: `${env.HOST}/auth/authenticate/google`,
			grant_type: 'authorization_code',
		};

		try {
			const res = await axios.post(url, qs.stringify(values), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			return {
				access_token: res.data.access_token,
				id_token: res.data.id_token,
			};
		} catch (error) {
			console.log(error);
			throw new ApiError('Error on get token', 500);
		}
	}
}
