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
  // Receber o token
  const authToken = request.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  // Validar se token é válido
  try {
    const { sub } = verify(token, config.jwtSecret) as IPayload;

    // recuperar ionformações do usuário
    request.user_id = sub;
  } catch (err) {
    response.status(401).end();
  }

  return next();
}
