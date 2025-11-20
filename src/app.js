import express from 'express';
import initdb from '../db/initdb.js';
// import passport from 'passport';
// import { query } from 'express-validator'

const app = express();
app.use(express.json())

initdb();

app.post('/user', (req, res) => {
    res.status(201).send({message: 'User Created'})
})

export default app