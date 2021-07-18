/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import { ListComplaintsService } from '../services/ListComplaintsService';

class ListComplaintsController {
  async handle(request:Request, response:Response) {
    const listComplaintsService = new ListComplaintsService();

    const districts = await listComplaintsService.execute();

    return response.json(districts);
  }
}

export default ListComplaintsController;
