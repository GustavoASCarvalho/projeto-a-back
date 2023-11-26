import 'dotenv/config';

export const env = {
	HOST: process.env.HOST || 'http://localhost:3000',
	FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:4200',
	PORT: process.env.PORT || 3000,
	HEALTH_CHECK_MESSAGE: process.env.HEALTH_CHECK_MESSAGE || 'OK',
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL: process.env.DATABASE_URL,
	PRIVATE_KEY: process.env.JWE_PRIVATE_KEY,
	PUBLIC_KEY: process.env.JWE_PUBLIC_KEY,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
