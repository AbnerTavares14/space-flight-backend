import { Router } from 'express';
import articleRouter from './articleRouter.js';

const router = Router();

router.use(articleRouter);

export default router;