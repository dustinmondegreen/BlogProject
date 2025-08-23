const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

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

module.exports = app