import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import router from './routers/index.js';
import handleErrorsMiddleware from './middlewares/handlerErrorsMiddleware.js';
import { cronScheduler } from './services/cron.js';
import { initialLoad } from './services/initialDatas.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

initialLoad();

cronScheduler();

app.use(handleErrorsMiddleware);

export default app;