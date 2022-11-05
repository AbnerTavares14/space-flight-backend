import { Request, Response } from "express";
import articleService from "../services/articleService.js";

export async function getArticles(req: Request, res: Response) {
    const articles = await articleService.getArticles();
    res.status(200).send(articles);
}

export function messageChallenge(req: Request, res: Response) {
    const message = "Fullstack Challenge 2021 🏅 - Space Flight News";
    res.status(200).send(message);
}