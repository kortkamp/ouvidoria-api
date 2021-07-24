/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name, email, admin = false, password,
  } : ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (userAlreadyExists) {
      throw new AppError('User already exists', 409);
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
