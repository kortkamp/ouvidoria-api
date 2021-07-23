/* eslint-disable class-methods-use-this */
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class AuthenticateUserController {
  async handle(request:Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const token = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export default AuthenticateUserController;
