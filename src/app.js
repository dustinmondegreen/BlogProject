import express from 'express';
import initdb from '../db/initdb.js';
import testValidData from '../schemas/userschema.js';

// import passport from 'passport';
// import { query } from 'express-validator'

const app = express();
app.use(express.json())

initdb();

testValidData();

app.post('/user', (req, res) => {
    res.status(201).send({message: 'User Created'})
})

export default app