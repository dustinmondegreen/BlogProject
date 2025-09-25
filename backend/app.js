import express from "express"
import mongooseConnect from "./utils/mongooseConnect.js"

const app = express()

app.use(express.json())

mongooseConnect();

export default app