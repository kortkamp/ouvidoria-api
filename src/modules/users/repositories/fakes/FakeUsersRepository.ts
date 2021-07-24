import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { v4 as uuid } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    name, email, password, admin = false,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      name,
      email,
      admin,
      password,
    });

    this.users.push(user);

    return user;
  }

  public async findById(userId: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.id === userId);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
}

export default FakeUsersRepository;
