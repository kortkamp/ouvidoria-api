/* eslint-disable class-methods-use-this */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import config from '@config/index';
import AppError from '@shared/errors/AppError';

interface IAuthenticateRequest {
  email:string;
  password:string
}
class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(
      email,
    );

    if (!user) {
      throw new AppError('Email/Password incorrect', 401);
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email/Password incorrect', 401);
    }

    const token = sign({
      email: user.email,
    },
    config.jwtSecret,
    {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserService };
