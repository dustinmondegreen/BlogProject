import { db } from "../db/initdb.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authenticateUser = async (req, res, next) => {
    try{
        const {email, username, password} = req.body;

        const user = db.prepare(`
            SELECT userID, email, username, password_hash
            FROM users
            WHERE email = ? OR username = ?
        `).get(email, username);

        if(!user){
            return res.status(404).send({message: 'User Not found (404)'});
        }

        const passwordCorrect = await bcrypt.compare(password, user.password_hash);

        if(!passwordCorrect){
            return res.status(401).send({message: 'Password Incorrect!'});
        }

        req.userID = user.userID;

        next();
    } catch (error) {
        return res.status(400).send({message: `${error}`});
    }
}

export const authenticateCookie = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(404).send({message: 'Token not found'}); 
        }

        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.userID = decodedToken.userID;
        next();
    } catch (error) {
        return res.status(400).send({message: `${error}`});
    }
}