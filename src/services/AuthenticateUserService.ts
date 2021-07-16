/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from '../repositories/UsersRepositories';

import { config } from '../config';

interface IAuthenticateRequest {
  email:string;
  password:string
}
class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // verificar se email exists
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }
    // verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }

    // gerar token
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
