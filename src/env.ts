import 'dotenv/config';

export const env = {
	PORT: process.env.PORT || 3333,
	HEALTH_CHECK_MESSAGE: process.env.HEALTH_CHECK_MESSAGE || 'OK',
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL: process.env.DATABASE_URL,
	PRIVATE_KEY: process.env.JWE_PRIVATE_KEY,
	PUBLIC_KEY: process.env.JWE_PUBLIC_KEY,
};
