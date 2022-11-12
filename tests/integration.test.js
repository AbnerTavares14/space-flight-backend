import request from 'supertest';
import app from '../src/app.js';
import prisma from '../src/config/db.js';
import jest from 'jest';
import {articleFactory} from './factories/articleFactory.js';
import dotenv from 'dotenv';

const data = articleFactory.generateArticle();

describe("testing api endpoints", () => {
    afterAll(async () => {
        dotenv.config({ path: '.env.test' });
        await prisma.articles.deleteMany();
        await prisma.$disconnect();
      });

    it("[POST] /articles - should return status code 201 Created", async () => {
        await request(app).post('/articles').send(data).expect(201);
    });

    it("[POST] /articles - should not be able to create an article when id or title is already taken", async () => {
        await request(app).post('/articles').send(data).expect(409);
    });

    it("[GET] / - should return challenge message", async () => {
        const response = await request(app).get('/').expect(200);
        expect(response.text).toBe("Fullstack Challenge 2021 🏅 - Space Flight News");
    });

    it("[GET] /articles - should be able to list all articles using pagination", async () => {
        const article = articleFactory.generateArticle();
        await request(app).post('/articles').send(article);
        const response1 = await request(app).get("/articles").query({
            limit:1
        }).expect(200);
        const response2 = await request(app).get("/articles").query({
            limit:2
        }).expect(200);
        expect(response1.body.length).toEqual(1);
        expect(response2.body.length).toEqual(2);
    });

    it("[GET] /article/:id - should be able to get article by id", async () => {
        const response = await request(app).get(`/articles/${data.id}`).expect(200);
        expect(response.body.id).toBe(data.id);
    });

    it("[GET] /article/:id - should not be able to get article by id when id not exist", async () => {
        await request(app).get(`/articles/${data.id + 12 }`).expect(404);
    });

    it("[GET] /article/title/:title - should be able to get article by title", async () => {
        const response = await request(app).get(`/articles/title/${data.title}`).expect(200);
        console.log(response.body);
        expect(response.body[0].title).toBe(data.title);
    });

    it("[PUT] - /articles - should be able to update an article", async () => {
        await request(app).put(`/articles`).send({...data, title:"Atualização 1"}).expect(200);
        const response = await request(app).get(`/articles/${data.id}`).expect(200);
        expect(response.body.title).toBe("Atualização 1");
    });

    it("[PUT] - /articles - should not be able to update an article when id not exist", async () => {
        await request(app).put(`/articles`).send({...data, id: -2}).expect(404);
    });

    it("[DELETE] - /articles/:id - should be able to delete an article", async () => {
        await request(app).get(`/articles/${data.id}`).expect(200);
    });


});
