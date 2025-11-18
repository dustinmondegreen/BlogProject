import express from 'express';
import initdb from '../db/initdb.js';
import passport from 'passport';
const app = express();

app.use(express.json())
 
initdb();

export default app