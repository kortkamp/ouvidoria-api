/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
// import { getCustomRepository } from 'typeorm';
import CreateUserService from '@modules/users/services/CreateUserService';
// import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name, email, admin, password,
    } = request.body;

    // we can have just one admin
    // let newUserAdmin = false;
    // if (admin) {
    //   const usersRepositories = getCustomRepository(UsersRepositories);
    //   const existsAdmin = await usersRepositoriy.findOne({ where: { admin: true } });
    //   if (!existsAdmin) {
    //     newUserAdmin = true;
    //   } else {
    //     return response.status(401).json({ error: 'unauthorized' });
    //   }
    // }

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name, email, admin, password,
    });

    return response.json(user);
  }
}

export default CreateUserController;
