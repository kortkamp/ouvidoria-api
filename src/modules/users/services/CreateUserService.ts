/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UsersRepositories } from '@modules/users/infra/typeorm/repositories/UsersRepositories';
import AppError from '@shared/errors/AppError';

interface IUSerRequest {
  name: string;
  email: string;
  admin?: boolean;
  password:string;

}
class CreateUserService {
  async execute({
    name, email, admin = false, password,
  } : IUSerRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists', 401);
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });
    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };