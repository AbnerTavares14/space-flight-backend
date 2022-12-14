import { Request, Response } from "express";
import articleService from "../services/articleService.js";
import * as handlerError from "../middlewares/handlerErrorsMiddleware.js";

export async function getArticles(req: Request, res: Response) {
    let { skip, limit } = req.query;
    const articles = await articleService.getArticles(+skip, +limit);
    res.status(200).send(articles);
}

export function messageChallenge(req: Request, res: Response) {
    const message = "Fullstack Challenge 2021 🏅 - Space Flight News";
    res.status(200).send(message);
}

export async function getArticleById(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        throw handlerError.unprocessableEntity();
    }
    const article = await articleService.getArticleById(+id);
    res.status(200).send(article);
}

export async function insertArticle(req: Request, res: Response) {
    const { id, featured, title, url, imageUrl, newsSite, summary, launches, events } = req.body;
    await articleService.insertArticle(id, featured, title, url, imageUrl, newsSite, summary, launches, events);
    res.sendStatus(201);
}

export async function deleteArticle(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
        throw handlerError.unprocessableEntity();
    }
    await articleService.deleteArticle(+id);
    res.sendStatus(200);
}

export async function getArticleByDate(req: Request, res: Response) {
    let { skip, limit } = req.query;
    const { order } = req.params;
    if (!order) {
        throw handlerError.unprocessableEntity();
    }
    const articles = await articleService.getArticlesByDate(order, +skip, +limit);
    res.status(200).send(articles);
}

export async function getArticleByTitle(req: Request, res: Response) {
    let { skip, limit } = req.query;
    const { title } = req.params;
    if (!title) {
        throw handlerError.unprocessableEntity();
    }
    const articles = await articleService.getArticleByTitle(title, +skip, +limit);
    res.status(200).send(articles);
}

export async function update(req: Request, res: Response) {
    const { id, featured, title, url, imageUrl, newsSite, summary, launches, events, publishedAt, updatedAt } = req.body;
    await articleService.updateArticle({ id, featured, title, url, imageUrl, newsSite, summary, publishedAt, updatedAt, launches, events });
    res.sendStatus(200);
}