/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from "cors"
import { ApiError, errorHandler } from './utils/ApiError';
import status from 'http-status';
import userRoutes from './routes/userRoutes'
import { pool } from './db/db';


const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json())
app.use(cors())


// MIDDLEWARES


console.log('ehllo getting here')

// ROUTES

app.post('/health', async (req, res) => {

  const result = await pool.query('SELECT FROM current_database');


  return res.status(200).json({
    body: req.body,
    message: 'Everything looking alright again'
  })
})

app.use('/api/v1', userRoutes)

// ERRORHANDLERS


app.use(errorHandler)


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(status.NOT_FOUND, 'Not found'));
});


const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
