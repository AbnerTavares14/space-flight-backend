import { Router } from 'express';
import { deleteArticle, getArticleByDate, getArticleById, getArticleByTitle, getArticles, insertArticle, messageChallenge, update } from '../controllers/articlesController.js';
import validateSchema from '../middlewares/validateSchema.js';
import articleSchema from '../schema/articleSchema.js';

const articleRouter = Router();

articleRouter.get('/', messageChallenge);
articleRouter.get('/articles', getArticles);
articleRouter.get('/articles/:id', getArticleById);
articleRouter.get('/articles/date/:order', getArticleByDate);
articleRouter.get('/articles/title/:title', getArticleByTitle);
articleRouter.post('/articles/', validateSchema(articleSchema), insertArticle);
articleRouter.delete('/articles/:id', deleteArticle);
articleRouter.put('/articles', update);

export default articleRouter;