/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { CreateComplaintService } from '@modules/complaints/services/CreateComplaintService';

class CreateComplaintController {
  async handle(request: Request, response: Response) {
    const {
      district_id, message,
    } = request.body;

    const { user_id } = request;

    const createComplimentService = new CreateComplaintService();

    const compliment = await createComplimentService.execute({
      district_id, user_sender: user_id, message,
    });

    response.json(compliment);
  }
}

export default CreateComplaintController;
