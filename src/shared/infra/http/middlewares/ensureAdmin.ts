import { Request, Response, NextFunction } from 'express';
import { User } from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default async function ensureAdmin(
  request: Request,
  response:Response,
  next:NextFunction,
) {
  // eslint-disable-next-line camelcase
  const { user_id } = request;

  const usersRepository = new UsersRepository();

  const { admin } = await usersRepository.findById(user_id) as User;

  if (admin) {
    return next();
  }
  return response.status(401).send({ error: 'Unauthorized' });
}
