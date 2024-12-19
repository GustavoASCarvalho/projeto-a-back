import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { env } from './env';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { rotas } from './routes/index.routes';

const app = express();

const corsOptions = {
	origin: '*',
	credentials: true,
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
