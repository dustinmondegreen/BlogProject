const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config()

const app = express()

const mongooseConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB Atlas!')
    } catch (error) {
        console.error(error)
    }
}

mongooseConnect()

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app