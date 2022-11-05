import * as handlerError from '../middlewares/handlerErrorsMiddleware.js';
import articleRepository from '../repositories/articleRepository.js';
import axios from 'axios';

async function getArticles() {
    const { data } = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
    return data;
}

const articleService = {
    getArticles
};

export default articleService;