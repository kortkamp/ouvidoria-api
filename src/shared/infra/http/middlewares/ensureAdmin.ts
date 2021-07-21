import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { UsersRepositories } from '@modules/users/infra/typeorm/repositories/UsersRepositories';

export default async function ensureAdmin(
  request: Request,
  response:Response,
  next:NextFunction,
) {
  // eslint-disable-next-line camelcase
  const { user_id } = request;

  const usersRepositrories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositrories.findOne(user_id) as User;

  if (admin) {
    return next();
  }
  return response.status(401).send({ error: 'Unauthorized' });
}
