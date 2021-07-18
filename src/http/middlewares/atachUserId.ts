import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import config from '../../config';

interface IPayload {
  sub:string
}

export default function atachUserId(
  request:Request,
  response:Response,
  next:NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    request.user_id = '';
    return next();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, config.jwtSecret) as IPayload;

    request.user_id = sub;
  } catch (err) {
    request.user_id = '';
    return next();
  }

  return next();
}
