/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class GetUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id:string) {
    const district = await this.usersRepository.findWithRelations(user_id, 'complaints');

    return classToPlain(district);
  }
}

export default GetUserService;
