import express from 'express';
import initdb from '../db/initdb.js';
import { db } from '../db/initdb.js';
import { validateUser } from '../middleware/validation.js';
import { authenticateUser } from '../middleware/authenticate.js';
import 'dotenv/config'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express();
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

app.post('/api/v1/auth/login', authenticateUser, async (req, res) => {
    const userDetails = {
        username: req.body.username
    };

    const token = jwt.sign(userDetails, process.env.SECRET_KEY, {expiresIn: 60*60});


    return res.status(200).send({token: token});
})


export default app