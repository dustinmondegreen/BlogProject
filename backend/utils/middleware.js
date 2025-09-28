import {MongoDB_URI} from "../config/config.js"
import mongoose from "mongoose"

export const mongooseConnect = async () => {
    try{
        const connect = await mongoose.connect(MongoDB_URI)
        console.log('MongoDB Atalas Connected Succesfully')
    } catch ( error ) {
        console.log(`MongoDB Atlas Connection error: ${error}`)
    }
}

