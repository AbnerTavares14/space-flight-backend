import articleService from "../src/services/articleService.js";
import articleRepository from "../src/repositories/articleRepository.js";
import {jest} from "@jest/globals";


describe("unit test suite", () => {
    it("should call the function getArticles", async () => {
        jest.spyOn(articleRepository,"getArticles").mockImplementation(() => {});
        const skip = 0;
        const limit = 10;
        await articleService.getArticles(skip, limit);
        expect(articleRepository.getArticles).toBeCalled();
    });

    it("should call function getArticleById", async () => {
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return {}});
        await articleService.getArticleById(12);
        expect(articleRepository.getArticleById).toBeCalled();
    });

    it("should call error not found when id not exist", async () => {
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return false});
        const promise = articleService.getArticleById(12);
        expect(promise).rejects.toEqual({type:'notFound'});
    });

    it("should call the function getArticleByTitle", async () => {
        jest.spyOn(articleRepository, "getArticleByTitle").mockImplementation(() => {
            return {}
        });
        await articleService.getArticleByTitle(0,1,"test");
        expect(articleRepository.getArticleByTitle).toBeCalled();
    });

    it("should call the error unprocessable entity when title not passed", () => {
        jest.spyOn(articleRepository, "getArticleByTitle").mockImplementation(() => {
            return {}
        });
        const promise = articleService.getArticleByTitle(0,1);
        expect(promise).rejects.toEqual({type: "unprocessableEntity"});
    });

    it("should call the function updateArticle", async () => {
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return {}});
        jest.spyOn(articleRepository, "updateArticle").mockImplementation(()=> {});
        await articleService.updateArticle(1, false, 'test',  'www.google.com',  'imagem.com', 'spaceTest', '', '12/11/22', '12/11/22');
        expect(articleRepository.updateArticle).toBeCalled();
    });

    it("should call the error not found when id not exist in the updateArticle function", async () => {
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return false});
        jest.spyOn(articleRepository, "updateArticle").mockImplementation(()=> {});
        const promise = articleService.updateArticle(1, false, 'test',  'www.google.com',  'imagem.com', 'spaceTest', '', '12/11/22', '12/11/22');
        expect(promise).rejects.toEqual({type: "notFound"});
    });

    it("should call the function insertArticle", async () => {
        jest.spyOn(articleRepository, "checkTitleExist").mockImplementation(() => {return false});
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return false});
        jest.spyOn(articleRepository, "insert").mockImplementation(() => {});
        await articleService.insertArticle(1, false, 'test', 'www.google.com', 'imagem.com', 'spaceTest', "");
        expect(articleRepository.checkTitleExist).toBeCalled();
        expect(articleRepository.updateArticle).toBeCalled();
    });

    it("should call the throw conflit error when title already exist", async () => {
        jest.spyOn(articleRepository, "checkTitleExist").mockImplementation(() => {return true});
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return {}});
        jest.spyOn(articleRepository, "insert").mockImplementation(() => {});
        const promise = articleService.insertArticle(1, false, 'test', 'www.google.com', 'imagem.com', 'spaceTest', "");
        expect(promise).rejects.toEqual( {type: 'conflict'} );
    });

    it("should call the function deleteArticle", async () => {
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return true});
        jest.spyOn(articleRepository, "deleteArticle").mockImplementation(() => {});
        await articleService.deleteArticle(1);
        expect(articleRepository.getArticleById).toBeCalled();
        expect(articleRepository.deleteArticle).toBeCalled();
    });

    it("should call the throw error when id not exist", async () => {
        jest.spyOn(articleRepository, "getArticleById").mockImplementation(() => {return false});
        const promise = articleService.deleteArticle(1);
        expect(promise).rejects.toEqual({type: "notFound"});
    });

    it("should call the getArticlesByDate", async () => {
        jest.spyOn(articleRepository, "getArticlesByDate").mockImplementation(() => {});
        await articleService.getArticlesByDate('asc');
        expect(articleRepository.getArticlesByDate).toBeCalled();
    });

    it("should call throw error if order is different from asc or desc", async () => {
        const promise = articleService.getArticlesByDate('test', 2);
        expect(promise).rejects.toEqual({type: "unprocessableEntity"});
    });
});