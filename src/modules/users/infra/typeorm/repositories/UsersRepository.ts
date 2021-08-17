/* eslint-disable camelcase */
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import AppError from '@shared/errors/AppError';
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

  public async findWithRelations(user_id:string, relation:string):Promise<User | undefined> {
    const userFound = await this.ormRepository.findOne({
      where: { id: user_id },
      relations: [relation],
    });
    if (!userFound) {
      throw new AppError('District not found', 404);
    }
    return userFound;
  }
}

export default UsersRepository;
