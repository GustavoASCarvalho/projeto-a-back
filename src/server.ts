import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { rotas } from './routes/index.routes';
import { env } from './env';

const app = express();

const corsOptions = {
	origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(rotas);

app.get('/', (_, res) => {
	return res.json({
		message: env.HEALTH_CHECK_MESSAGE || 'OK',
	});
});

app.use(new ErrorMiddleware().middleware);

app.listen(env.PORT || 3000, () => {
	console.log(`Server started on port http://localhost:${env.PORT || 3000}`);
});
