/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { User } from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(user_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findWithRelations(user_id:string, relation:string):Promise<User | undefined>;
}

export default IUsersRepository;
