import express from "express"
import mongoose from "mongoose"
import {MongoDB_URI} from "./config/config.js"

const app = express()

app.use(express.json())

const mongooseConnect = async () => {
    try{
        const connect = await mongoose.connect(MongoDB_URI)
        console.log('MongoDB Atalas Connected Succesfully')
    } catch ( error ) {
        console.log(`MongoDB Atlas Connection error: ${error}`)
    }
}

mongooseConnect();

export default app