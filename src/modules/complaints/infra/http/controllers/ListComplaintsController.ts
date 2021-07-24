/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListComplaintsService from '@modules/complaints/services/ListComplaintsService';

class ListComplaintsController {
  async handle(request:Request, response:Response) {
    const listComplaintsService = container.resolve(ListComplaintsService);

    const districts = await listComplaintsService.execute();

    return response.json(districts);
  }
}

export default ListComplaintsController;
