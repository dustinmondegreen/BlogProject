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

// app.post('/api/v1/users', validateUser, async (req, res) => {
//     try{
//         const {email, username, password} = req.body;

//         const passwordHash = await bcrypt.hash(password, 10)

//         const insert = db.prepare(`INSERT INTO users(email, username, password_hash) VALUES (?, ?, ?)`);

//         const info = insert.run(email, username, passwordHash)

//         return res.status(201).send({message: `${info.lastInsertRowid}`});
//     } catch (error) {
//         console.log(error);
//         return res.status(400).send({message: `${error}`})
//     }
// })

// app.use('/api', authenticateCookie);

// app.post('/api/v1/auth/login', authenticateUser, async (req, res) => {
//     const token = jwt.sign(req.body.username, process.env.SECRET_KEY);
//     res.cookie('token', token, {
//         httpOnly: true, 
//         secure: true,
//         sameSite: 'Lax',
//         path: '/'
//     });

//     res.status(201).send({message: `Succesfully logged in`})
    
// })

app.get('/api/v1/posts', (req, res) => {
    try{
        const blogs = db.prepare(`
            SELECT B.title, B.body, B.publishDate
            FROM blogs B
            ORDER BY blogID DESC
            LIMIT 10;
        `).all();

        console.log('10 blogs retrieved');

        console.log(blogs);

        return res.status(200).json(blogs);

    } catch (error) {
        return res.status(404).send({message: 'no blogs found'});
    };
});

app.get('/api/v1/posts/:id', (req, res) => {
    try {
        console.log(req.params.id);

        const blog = db.prepare(`
            SELECT B.title, B.body, B.publishDate
            FROM blogs B WHERE blogID = ?;
        `).get(req.params.id);

        return res.status(200).json(blog);
    } catch (error) {
        return res.status(404).send({message: 'no blogs found'});
    }

});

app.post('/api/v1/posts', (req, res) => {
    const {title, body, userID} = req.body; 

    try{
        const blog = db.prepare(`
            INSERT INTO blogs(title, body, userID) VALUES
	            (?, ?, ?);    
        `).run(title, body, userID);

        return res.status(201).send({message: `Blog Created: ${blog.changes}`});
    } catch (error) {
        return res.status(400).send({error});
    }
}); 

app.put('/api/v1/posts/:id', (req, res) => {
    const {title, body} = req.body;

    try{
        const blog = db.prepare(`
            UPDATE blogs
            SET
                title = ?,
                body = ?
            WHERE blogID = ?    
        `).run(title, body, req.params.id);
        return res.status(200).send({message: `Blog Updated: ${blog.changes}`});

    } catch (error) {
        return res.status(400).send({error});
    }
});

app.delete('/api/v1/posts/:id', (req, res) => {
    try{
        const blog = db.prepare(`
            DELETE FROM blogs
            WHERE blogID = ?
        `).run(req.params.id);
        return res.status(204).send({message: 'blog deleted'});
    } catch(error) {
        return res.status(400).send({error});
    }
});





export default app