import express from 'express';
import initdb from '../db/initdb.js';

const app = express();

initdb();

export default app