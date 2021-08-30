/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import config from '@config/index';
import AppError from '@shared/errors/AppError';
import IAuthenticateRequestDTO from '@modules/users/dtos/IAuthenticateRequestDTO';
import { inject, injectable } from 'tsyringe';

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IAuthenticateRequestDTO) {
    // const usersRepository = new UsersRepository();

    const user = await this.usersRepository.findByEmail(
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
      id: user.id,
      name: user.name,
      admin: user.admin,
      email: user.email,
    },
    config.jwtSecret,
    {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      id: user.id,
      token,
      name: user.name,
      admin: user.admin,

    };
  }
}

export default AuthenticateUserService;
