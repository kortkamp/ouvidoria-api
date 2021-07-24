/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDistrictService from '@modules/districts/services/CreateDistrictService';

class CreateDistrictController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = container.resolve(CreateDistrictService);

    const tag = await createTagService.execute(name);

    return response.json(tag);
  }
}

export default CreateDistrictController;
