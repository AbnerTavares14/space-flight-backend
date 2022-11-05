import { Router } from 'express';
import { getArticles, messageChallenge } from '../controllers/articlesController.js';

const articleRouter = Router();

articleRouter.get('/', messageChallenge);
articleRouter.get('/articles', getArticles);

export default articleRouter;