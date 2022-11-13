<p align="center">
  <a href="https://github.com/AbnerTavares14/space-flight-backend">
    <img src="https://media.istockphoto.com/id/1300054518/vector/modern-space-helmet-with-rocket-launch-inside.jpg?s=612x612&w=0&k=20&c=EOUiDmdTVh0-GpDKqIGovvZ9jwplPCDVGIYQsuCPwD8=" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    Space Flight Challenge
  </h3>
</p>

**_This is a challenge by Coodesh_**

### Esse é um desafio fullstack da Coodesh cujo o objetivo é fazer um back-end que utilize um script para pegar os dados da API pública da space flight e fazer um cron para esses dados serem atualizados todos os dias as 9h da manhã. [Clique aqui](https://github.com/AbnerTavares14/space-flight) para ser redirecionado para o meu repositório front-end deste desafio.

# Tecnologias usadas

[NodeJS](https://nodejs.org/en/)

[PostgreSQL](https://www.postgresql.org)

[TypeScript](https://www.typescriptlang.org)

[ExpressJS](https://expressjs.com/pt-br/)

[Axios](https://axios-http.com/ptbr/docs/intro)

[Prisma](https://www.prisma.io)

[Jest](https://jestjs.io/pt-BR/)

[Supertest](https://www.npmjs.com/package/supertest)

[Joi](https://joi.dev/api/?v=17.7.0)

[node-cron](https://www.npmjs.com/package/node-cron)

[nodemon](https://www.npmjs.com/package/nodemon)

[express-async-errors](https://www.npmjs.com/package/express-async-errors)

[Dotenvi](https://www.npmjs.com/package/dotenv)


## Uso

```bash
$ git clone https://github.com/AbnerTavares14/space-flight-backend

$ npm install

$ npm run dev
```

API:

```
- GET /
    - Rota que retornar um texto escrito "Fullstack Challenge 2021 🏅 - Space Flight News"

- GET /articles
    - Rota para pegar todos os artigos. Por padrão, puxa os 10 primeiros artigos ordenados por ID.
    - headers: {}
    - body: {}
    - querys:
        skip - Pula um número específico de resultados (valor padrão é 0),
        limit - Maximum number of results possible (valor padrão é 10)
    
- GET /articles/:id
    - Rota para pegar um artigo específico pelo seu id.
    - headers: {}
    - querys: {}

- GET /articles/title/:title
    - Rota para pegar artigos que contenham no título o parâmetro passado na url.
    - headers: {}
    - querys:
        skip - Pula um número específico de resultados (valor padrão é 0),
        limit - Maximum number of results possible (valor padrão é 10)

- GET /articles/date/:order
    - Rota para pegar artigos ordenados pela data de publicação. Os valores aceitos no parâmetro são "asc" e "desc".
    - headers: {}
    - querys:
        skip - Pula um número específico de resultados (valor padrão é 0),
        limit - Maximum number of results possible (valor padrão é 10)
     
- POST /articles
    - Rota para inserir um artigo
    - headers: {}
    - body: {
        "id": number,
        "featured": boolean,
        "title": string,
        "url": string,
        "imageUrl": string,
        "newsSite": string,
        "summary": string,
        "launches": Object[]
        "events": Object[]
    }
    - querys: {}

- PUT /articles
    - Rota para atualizar um artigo, é necessário que o id passado no body exista na base de dados.
    - headers: {}
    - body: {
        "id": number,
        "featured": boolean,
        "title": string,
        "url": string,
        "imageUrl": string,
        "newsSite": string,
        "summary": string,
        "publishedAt": date,
        "updatedAt": date,
        "launches": Object[],
        "events": Object[]
    }
    - querys: {}

- DELETE /articles/:id
    - Rota para deletar um artigo pelo seu id
    - headers: {}
    - body: {}
    - querys: {}
```
