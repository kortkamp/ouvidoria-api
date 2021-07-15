import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import 'reflect-metadata';
import 'express-async-errors';

import { apiRoutes } from './routes';

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
app.use((err:any, req:Request, res:Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send();
});

module.exports = app;
