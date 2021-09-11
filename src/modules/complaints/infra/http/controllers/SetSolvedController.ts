/* eslint-disable @typescript-eslint/naming-convention */

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SetSolvedService from '@modules/complaints/services/SetSolvedService';

class SetSolvedController {
  async handle(request: Request, response: Response) {
    const { solved } = request.body;
    const { complaint_id } = request.params;
    const { user_id } = request;

    const setSolvedService = container.resolve(SetSolvedService);

    const compliment = await setSolvedService.execute({
      complaint_id: Number(complaint_id), solved, user_id,
    });

    response.json(compliment);
  }
}

export default SetSolvedController;
