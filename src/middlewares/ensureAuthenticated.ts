import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import config from '../config';

interface IPayload {
  sub:string
}

export default function EnsureAuthenticated(
  request:Request,
  response:Response,
  next:NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, config.jwtSecret) as IPayload;

    request.user_id = sub;
  } catch (err) {
    response.status(401).end();
  }

  return next();
}
