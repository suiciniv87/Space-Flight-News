import * as cron from 'node-cron'
import * as Axios from 'axios'
import { client } from '../../db'
import { IFillDb } from '../interfaces/articles'

class Job {

    static async CronJob() {
        console.log('Cron job scheduled!')

        cron.schedule('0 9 * * *', async () => {
            
            console.log('Running a cron job - Fill DB');
            try {
                await client.connect()
                const database = client.db("Space")

                const collection = database.collection<IFillDb>("articles")

                const URL = 'https://api.spaceflightnewsapi.net/v3/articles'

                const setAllArticles = await Axios.default.get(URL)

                const item = setAllArticles.data

                item.map(async data => {
                    await collection.insertOne({ currentDate: new Date(), data })
                })
                
                console.log("Cron job finished - DB filled")

            } catch {
                console.log("Error in fill DB")
            } 
            
        }, {
            scheduled: true,
            timezone: "America/Sao_Paulo"
        })
    }
}

  export { Job }