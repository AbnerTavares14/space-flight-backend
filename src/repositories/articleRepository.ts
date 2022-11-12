import prisma from "../config/db.js";
import { CreateArticle, updateArticle } from '../services/articleService.js';



async function getArticles(skip?: number, limit?: number) {
    return prisma.articles.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            id: 'asc'
        }
    });
}

async function getArticlesByDate(skip?: number, limit?: number, order?: any) {
    return prisma.articles.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            publishedAt: order
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

async function getArticleByTitle(title: string, skip: number, take: number) {
    return prisma.articles.findMany({
        skip,
        take,
        where: {
            title: {
                contains: title
            }
        }
    });
}

async function checkTitleExist(title: string) {
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

async function updateArticle(data: updateArticle) {
    console.log(data);
    return prisma.articles.update({
        where: {
            id: data.id
        },
        data
    });
}

const articleRepository = {
    getArticles,
    getArticleById,
    insert,
    getArticleByTitle,
    deleteArticle,
    getArticlesByDate,
    checkTitleExist,
    updateArticle
};

export default articleRepository;