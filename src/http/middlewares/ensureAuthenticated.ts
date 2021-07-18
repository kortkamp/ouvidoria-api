import { Request, Response, NextFunction } from 'express';

export default function EnsureAuthenticated(
  request:Request,
  response:Response,
  next:NextFunction,
) {
  const { user_id } = request;

  if (!user_id) {
    return response.status(401).end();
  }

  return next();
}
