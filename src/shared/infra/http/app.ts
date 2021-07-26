import 'reflect-metadata';
import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import AppError from '@shared/errors/AppError';
import apiRoutes from './routes';
import db from '../typeorm';
import '@shared/container';

db.create();

const app = express();

if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((req:Request, res:Response, next:NextFunction) => {
  throw new AppError('Not Found', 404);
});

// error handler
app.use((err: Error, request: Request, response:Response, next:NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'erro',
    message: 'Internal Server Error',
  });
});

export default app;
