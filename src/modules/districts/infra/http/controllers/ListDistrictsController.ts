/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDistrictsService from '@modules/districts/services/ListDistrictsService';

class ListDistrictsController {
  async handle(request:Request, response:Response) {
    const listDistrictsService = container.resolve(ListDistrictsService);

    const districts = await listDistrictsService.execute();

    return response.json(districts);
  }
}

export default ListDistrictsController;
