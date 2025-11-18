import express from 'express';
import initdb from '../db/initdb.js';
import passport from 'passport';
const app = express();

app.use(express.json())

initdb();

// app.get('/', (req, res) => {
//     console.log('root received')
//     return res.status(200).json({message: "Received"})
// })

// app.post('/api/v1/users', (req, res) => {
//     console.log(req.body);
//     return res.status(200).send({message: 'received'});
// })

export default app