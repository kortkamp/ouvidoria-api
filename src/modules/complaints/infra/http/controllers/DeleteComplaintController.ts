/* eslint-disable @typescript-eslint/naming-convention */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DeleteComplaintService from '@modules/complaints/services/DeleteComplaintService';

class DeleteComplaintController {
  async handle(request: Request, response: Response) {
    const {
      complaint_id,
    } = request.params;

    const { user_id } = request;

    const deleteComplimentService = container.resolve(DeleteComplaintService);

    const compliment = await deleteComplimentService.execute({
      complaint_id, user_id,
    });

    response.json(compliment);
  }
}

export default DeleteComplaintController;
