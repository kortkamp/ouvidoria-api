/* eslint-disable @typescript-eslint/naming-convention */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateComplaintService from '@modules/complaints/services/CreateComplaintService';

class CreateComplaintController {
  async handle(request: Request, response: Response) {
    const {
      district_id, message, image,
    } = request.body;

    const { user_id } = request;

    const createComplimentService = container.resolve(CreateComplaintService);

    const compliment = await createComplimentService.execute({
      district_id, user_sender: user_id, message, image,
    });

    response.json(compliment);
  }
}

export default CreateComplaintController;
