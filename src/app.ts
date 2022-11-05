import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routers/index.js';
import handleErrorsMiddleware from './middlewares/handlerErrorsMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleErrorsMiddleware);

export default app;