import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import apiRoutes from './routes';

import './database/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((req:Request, res:Response, next:NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: Error, request: Request, response:Response, next:NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: 'erro',
    message: 'Internal Server Error',
  });
});

module.exports = app;
