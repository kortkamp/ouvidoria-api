/* eslint-disable @typescript-eslint/naming-convention */
import { Request, Response } from 'express';
import DeleteAnswerService from '@modules/answers/services/DeleteAnswerService';
import { container } from 'tsyringe';

class CreateAnswerController {
  async handle(request: Request, response: Response) {
    const {
      answer_id,
    } = request.params;

    const deleteAnswerService = container.resolve(DeleteAnswerService);

    const result = await deleteAnswerService.execute(answer_id);

    response.json(result);
  }
}

export default CreateAnswerController;
