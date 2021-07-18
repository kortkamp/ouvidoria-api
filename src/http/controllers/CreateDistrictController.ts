/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { CreateDistrictService } from '../../services/CreateDistrictService';

class CreateDistrictController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const createTagService = new CreateDistrictService();

    const tag = await createTagService.execute(name);

    return response.json(tag);
  }
}

export default CreateDistrictController;
