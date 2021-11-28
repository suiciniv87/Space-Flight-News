import "express-async-errors"
import express, { NextFunction, Request, Response } from "express"
import { router } from "./routes"
import cors from 'cors'
import { Job } from './config/cron'

const app = express()


app.use(express.json())

app.use(router)

app.use(cors())


app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "Error",
        message: error.message,
    })
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("Servidor rodando na porta %d", port)
    Job.CronJob()
})