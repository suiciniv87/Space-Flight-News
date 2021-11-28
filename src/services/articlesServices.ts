import * as Axios from 'axios'
import { client } from '../../db'
import { IArticleID, ILimiteArticles, IFillDb, IPublishOneArticle, IUpdateOneArticle } from '../interfaces/articles'

class ArticlesServices {
    static async showAll({ startIndex, endIndex }: ILimiteArticles) {

       try {
           await client.connect()

           const database = client.db("Space")

           const collection = await database.collection("articles").find({}).toArray()
        
           return { "status": 200, "data": collection.slice(startIndex, endIndex) }

       } catch {
            throw new Error("Error in insert data")
        } finally {
            await client.close()
        }
    }

    static async fillDB() {

        try {
            await client.connect()
            const database = client.db("Space")

            const collection = database.collection<IFillDb>("articles")

            const URL = 'https://api.spaceflightnewsapi.net/v3/articles'

            const setAllArticles = await Axios.default.get(URL)

            const item = setAllArticles.data

            let result: any

            item.map(async data => {
                result = await collection.insertOne({ currentDate: new Date(), data })
            })
            
            return { "status": 200, "message": "DB filled" }

        } catch {
            throw new Error("Error in insert data")
        } 
    }

    static async showOne({ id }: IArticleID) {

        try {
            await client.connect()
            
            const database = client.db("Space")

            const collection = await database.collection("articles").findOne(
                {
                    "data.id": id
                }
            )

            if (collection != null) return { "status": 200, "data": collection }
            return { "status": 200, "data": "no data found!" }
 
        } catch {
             throw new Error("Error in search data")
         } finally {
             await client.close()
         }
     }

     static async pubOne({ id, title, url, imageUrl, newsSite, summary, publishedAt, updatedAt, featured, launches, events }: IPublishOneArticle) {

        try {
            await client.connect()
 
            const database = client.db("Space")
 
            const collection = await database.collection("articles").insertOne({ 
                currentDate: new Date(),
                data: {
                    id,
                    title,
                    url,
                    imageUrl,
                    newsSite,
                    summary,
                    publishedAt: new Date(),
                    updatedAt: new Date(),
                    featured,
                    launches,
                    events
                }
            })

            return { "status": 200, "data": collection }
 
        } catch {
             throw new Error("Error in fill data into DB")
         } finally {
             await client.close()
         }
     }

     static async modifyOne({ id }: IArticleID, { title, url, imageUrl, newsSite, summary, updatedAt, featured, launches, events }: IUpdateOneArticle) {

        try {
            await client.connect()
 
            const database = client.db("Space")
 
            const collection = await database.collection("articles").findOneAndUpdate(
                { "data.id": id },
                { $set: {
                    "data.title": title,
                    "data.url": url,
                    "data.imageUrl": imageUrl,
                    "data.newsSite": newsSite,
                    "data.summary": summary,
                    "data.updatedAt": new Date(),
                    "data.featured": featured,
                    "data.launches": launches,
                    "data.events": events
                }
            })

            return { "status": 200, "data": collection }
 
        } catch {
             throw new Error("Error in update data into DB")
         } finally {
             await client.close()
         }
     }

     static async removeOne({ id }: IArticleID) {
        try {
            await client.connect()
            
            const database = client.db("Space")

            await database.collection("articles").findOneAndDelete(
                {
                    "data.id": id
                }
            )

            return { "status": 200, "data": "Article removed successfully" }
 
        } catch {
             throw new Error("Error in your request.")
         } finally {
             await client.close()
         }
     }
}

export { ArticlesServices }