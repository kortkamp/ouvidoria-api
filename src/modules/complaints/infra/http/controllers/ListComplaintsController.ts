/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListComplaintsService from '@modules/complaints/services/ListComplaintsService';

class ListComplaintsController {
  async handle(request:Request, response:Response) {
    const listComplaintsService = container.resolve(ListComplaintsService);
    const { user_id } = request;
    const {
      district_id, user_sender, search, page, limit,
    } = request.query as {
      user_id:string,
      district_id:string,
      user_sender:string,
      search:string,
      page:string,
      limit:string
    };

    const districts = await listComplaintsService.execute({
      user_id,
      district_id,
      user_sender,
      search,
      page,
      limit,
    });

    return response.json(districts);
  }
}

export default ListComplaintsController;
