import { Router } from 'express';
import { deleteArticle, getArticleById, getArticles, insertArticle, messageChallenge } from '../controllers/articlesController.js';
import validateSchema from '../middlewares/validateSchema.js';
import articleSchema from '../schema/articleSchema.js';

const articleRouter = Router();

articleRouter.get('/', messageChallenge);
articleRouter.get('/articles', getArticles);
articleRouter.get('/articles/:id', getArticleById);
articleRouter.post('/articles/', validateSchema(articleSchema), insertArticle);
articleRouter.delete('/articles/:id', deleteArticle);

export default articleRouter;