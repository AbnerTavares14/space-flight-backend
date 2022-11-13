import * as handlerError from '../middlewares/handlerErrorsMiddleware.js';
import articleRepository from '../repositories/articleRepository.js';
import { articles } from "@prisma/client";

export type CreateArticle = Omit<articles, "publishedAt" | "updatedAt">;
export type updateArticle = articles

async function getArticles(skip?: number, take?: number) {
    const querys = aux(skip, take);
    const articles = await articleRepository.getArticles(querys.defaultSkip, querys.defaultLimit);
    return articles;
}

async function getArticleById(id: number) {
    const article = await articleRepository.getArticleById(id);
    if (!article) {
        throw handlerError.notFoundError();
    }
    return article;
}

async function getArticleByTitle(title: string, skip?: number, take?: number) {
    const querys = aux(skip, take);
    const articles = await articleRepository.getArticleByTitle(title, querys.defaultSkip, querys.defaultLimit);
    return articles;

}

async function updateArticle(article: updateArticle) {
    const articleExist = await articleRepository.getArticleById(article.id);
    if (!articleExist) {
        throw handlerError.notFoundError();
    }
    await articleRepository.updateArticle(article);
}

function aux(skip?: number, take?: number) {
    const obj = { defaultSkip: 0, defaultLimit: 0 };
    if (!skip) {
        obj.defaultSkip = 0;
    } else {
        obj.defaultSkip = skip;
    }
    if (!take) {
        obj.defaultLimit = 10;
    } else {
        obj.defaultLimit = take;
    }

    return obj;
}

async function insertArticle(id: number, featured?: boolean, title?: string, url?: string, imageUrl?: string, newsSite?: string, summary?: string, launches?: any, events?: any) {
    const data = { id, featured, title, url, imageUrl, newsSite, summary, launches, events };
    const checkTitle = await articleRepository.checkTitleExist(title);
    const checkId = await articleRepository.getArticleById(id);
    if (checkTitle || checkId) {
        throw handlerError.conflict();
    }
    await articleRepository.insert(data);
}

async function getArticlesByDate(order: string, skip?: number, take?: number) {
    const querys = aux(skip, take);
    if (order !== 'asc' && order !== 'desc') {
        throw handlerError.unprocessableEntity();
    }
    const articles = await articleRepository.getArticlesByDate(querys.defaultSkip, querys.defaultLimit, order);
    return articles;
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
    deleteArticle,
    getArticlesByDate,
    getArticleByTitle,
    updateArticle
};

export default articleService;