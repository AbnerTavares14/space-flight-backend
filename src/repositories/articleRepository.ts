import { articles } from "@prisma/client";
import prisma from "../config/db.js";
import { CreateArticle } from '../services/articleService.js';

async function getArticles(skip?: number, limit?: number) {
    return prisma.articles.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            id: 'asc'
        }
    });
}

async function getArticleById(id: number) {
    return prisma.articles.findUnique({
        where: {
            id
        }
    });
}

async function getArticleByTitle(title: string) {
    return prisma.articles.findFirst({
        where: {
            title
        }
    });
}

async function insert(data: CreateArticle) {
    return prisma.articles.create({
        data
    });
}

async function deleteArticle(id: number) {
    return prisma.articles.delete({
        where: {
            id
        }
    });
}

const articleRepository = {
    getArticles,
    getArticleById,
    insert,
    getArticleByTitle,
    deleteArticle
};

export default articleRepository;