import * as handlerError from '../middlewares/handlerErrorsMiddleware.js';
import articleRepository from '../repositories/articleRepository.js';
import { articles } from "@prisma/client";

export type CreateArticle = Omit<articles, "publishedAt" | "updatedAt">;

async function getArticles(skip?: number, take?: number) {
    const defaultSkip = 0;
    const defaultLimit = 10;
    if (!skip) {
        skip = defaultSkip;
    }
    if (!take) {
        take = defaultLimit;
    }
    const articles = await articleRepository.getArticles(skip, take);
    return articles;
}

async function getArticleById(id: number) {
    const article = await articleRepository.getArticleById(id);
    return article;
}

async function insertArticle(id: number, featured?: boolean, title?: string, url?: string, imageUrl?: string, newsSite?: string, summary?: string, launches?: any, events?: any) {
    const data = { id, featured, title, url, imageUrl, newsSite, summary, launches, events };
    const checkTitle = await articleRepository.getArticleByTitle(title);
    const checkId = await articleRepository.getArticleById(id);
    if (checkTitle || checkId) {
        throw handlerError.conflict();
    }
    await articleRepository.insert(data);
}

async function deleteArticle(id: number) {
    const articleExist = await articleRepository.getArticleById(id);
    if (!articleExist) {
        throw handlerError.notFoundError();
    }
    await articleRepository.deleteArticle(id);
}

const articleService = {
    getArticles,
    getArticleById,
    insertArticle,
    deleteArticle
};

export default articleService;