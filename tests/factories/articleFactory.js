import {faker} from '@faker-js/faker';

function generateArticle() {
    const id = parseInt(faker.random.numeric());
    const title = faker.lorem.sentence();
    const url = faker.internet.domainName();
    const imageUrl = faker.image.cats();
    const newsSite = faker.random.word();
    const summary = faker.lorem.lines();
    return {id, featured: false, title, url, imageUrl, newsSite, summary, launches: [], events: []};
}

export const articleFactory = {
    generateArticle
};