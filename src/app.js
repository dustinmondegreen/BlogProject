import express from 'express';
import initdb from '../db/initdb.js';
import { db } from '../db/initdb.js';
import { validateUser } from '../middleware/validation.js';
import bcrypt from 'bcrypt'

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
        return res.status(400).send({message: `${error}`})
    }

})

export default app