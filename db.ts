import dotenv from 'dotenv'

dotenv.config()

import { MongoClient } from "mongodb"

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ooshw.mongodb.net/?maxPoolSize=20&w=majority`

// Create a new MongoClient
const client = new MongoClient(uri);

export { client }