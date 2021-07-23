/* eslint-disable camelcase */
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    admin = false,
    password,
  } : ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      admin,
      password,
    });

    await this.ormRepository.save(user);
    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const userFound = await this.ormRepository.findOne({
      where: { id: user_id },
    });

    return userFound;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFound = await this.ormRepository.findOne({
      where: { email },
    });
    return userFound;
  }
}

export default UsersRepository;
