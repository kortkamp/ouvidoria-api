/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListComplaintsByUserService from '@modules/complaints/services/ListComplaintsByUserService';

class ListComplaintsByUserController {
  async handle(request:Request, response:Response) {
    const { user_id } = request;
    const { sender_id } = request.params;
    const { page, limit } = request.query;
    const listComplaintsByUserService = container.resolve(ListComplaintsByUserService);

    const districts = await listComplaintsByUserService.execute(
      user_id,
      sender_id,
      page as string,
      limit as string,
    );

    return response.json(districts);
  }
}

export default ListComplaintsByUserController;
