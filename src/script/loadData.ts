import prisma from '../config/db.js';
import axios from 'axios';
import { articles } from '@prisma/client';


const instance = axios.create({
    baseURL: 'https://api.spaceflightnewsapi.net/v3/articles'
});

async function loadData() {
    const articles = await prisma.articles.findMany({
        orderBy: {
            id: 'asc'
        }
    });
    let start = 0;
    let limit = 2000;
    let interrupt = false;
    let quantityArticles = articles.length;
    let articlesToUpdate = [];

    while (!interrupt) {
        const { data } = await instance.get('', {
            params: { _limit: limit, _start: start }
        });
        quantityArticles += data.length;
        start = quantityArticles;
        const checkArticleId = {};
        data.forEach((article) => {
            checkArticleId[article.id] = true;
        });

        if (data.length > 0) {
            const newArticles: articles[] = data.filter((article, idx: number) => {
                if (checkArticleId[articles[idx]?.id]) {
                    articlesToUpdate.push(article);
                    return false;
                }
                return true;
            });
            const createArticles = await prisma.articles.createMany({
                data: newArticles,
                skipDuplicates: true
            });

            const promises = articlesToUpdate.map(async (article) => {
                await prisma.articles.update({
                    data: article,
                    where: {
                        id: article.id
                    }
                });
            });

            await Promise.all(promises);

            console.log(`${createArticles.count} new articles were inserted.`);

            if (articlesToUpdate.length > 0) {
                console.log(`${articlesToUpdate.length} articles were updated.`);
            }
        } else {
            interrupt = true;
        }

    }
}

export default loadData;