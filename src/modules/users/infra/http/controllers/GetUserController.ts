/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetUserService from '@modules/users/services/GetUserService';

class GetUserController {
  async handle(request: Request, response: Response) {
    const {
      user_id,
    } = request.params;

    const getUserService = container.resolve(GetUserService);

    const user = await getUserService.execute(user_id);

    return response.json(user);
  }
}

export default GetUserController;
