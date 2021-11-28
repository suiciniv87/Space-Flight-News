import { Request, Response } from 'express'
import { ArticlesServices } from '../services/articlesServices'


class Articles {
    static async showAll(request: Request, response: Response) {

        let page = +request.query.page || 1
        let limit = +request.query.limit || 10
        let startIndex = (page - 1) * limit
        let endIndex = page * limit

        const getAll = await ArticlesServices.showAll({startIndex, endIndex})

        return response.json(getAll)
    }

    static async fillDB(request: Request, response: Response) {
        const fillDb = await ArticlesServices.fillDB()

        return response.json(fillDb)
    }

    static async showOne(request: Request, response: Response) {

        let id = +request.params.id;

        const get = await ArticlesServices.showOne({ id })

        return response.json(get)
    }

    static async pubOne(request: Request, response: Response) {

        let data = request.body;

        const publish = await ArticlesServices.pubOne(data)

        return response.json(publish)
    }

    static async modifyOne(request: Request, response: Response) {

        let id = +request.params.id;

        let data = request.body;

        const modify = await ArticlesServices.modifyOne({ id }, data)

        return response.json(modify)
    }

    static async removeOne(request: Request, response: Response) {

        let id = +request.params.id;

        const remove = await ArticlesServices.removeOne({ id })

        return response.json(remove)
    }
}

export { Articles }