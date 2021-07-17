/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import { ListDistrictsService } from '../services/ListDistrictsService';

class ListDistrictsController {
  async handle(request:Request, response:Response) {
    const listDistrictsService = new ListDistrictsService();

    const districts = await listDistrictsService.execute();

    return response.json(districts);
  }
}

export { ListDistrictsController };