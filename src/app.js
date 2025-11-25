import express from 'express';
import initdb from '../db/initdb.js';
import { db } from '../db/initdb.js';
import { validateUser } from '../middleware/validation.js';
import { authenticateUser, authenticateCookie } from '../middleware/authenticate.js';
import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());

initdb();

app.post('/api/v1/users', validateUser, async (req, res) => {
    try{
        const {email, username, password} = req.body;

        const passwordHash = await bcrypt.hash(password, 10)

        const insert = db.prepare(`INSERT INTO users(email, username, password_hash) VALUES (?, ?, ?)`);

        const info = insert.run(email, username, passwordHash)

        return res.status(201).send({message: `${info.lastInsertRowid}`});
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: `${error}`})
    }
})

app.use('/api', authenticateCookie);

app.post('/api/v1/auth/login', authenticateUser, async (req, res) => {
    const token = jwt.sign(req.body.username, process.env.SECRET_KEY);
    res.cookie('token', token, {
        httpOnly: true, 
        secure: true,
        sameSite: 'Lax',
        path: '/'
    });

    res.status(201).send({message: `Succesfully logged in`})
    
})


export default app