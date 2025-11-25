import { db } from "../db/initdb.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateUser = async (req, res, next) => {
    const {email, username, password} = req.body; 
    const query = db.prepare(`
        SELECT userID, email, username, password_hash FROM users WHERE email = ? OR username = ?
    `);

    try{
        const user = query.get(email, username);

        if(!user.username || !user.email){
            return res.status(404).send({message: 'user not found'})
        };

        const passwordCorrect = await bcrypt.compare(password, user.password_hash)

        if(!passwordCorrect){
            return res.status(400).send({message: 'incorrect user!'})
        };

        next();

    } catch (error){
        console.log(error);
        return res.status(404).send(error)
    }
}

export const authenticateCookie = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send({error: 'stop hacking'});
    }

    const user = jwt.verify(token, process.env.SECRET_KEY);

    if(!user) {
        return res.status(401).send({error: 'stop hacking'});
    }

    req.user = user; 

    next();
}