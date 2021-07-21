/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { DeleteAnswerService } from '@modules/answers/services/DeleteAnswerService';

class CreateAnswerController {
  async handle(request: Request, response: Response) {
    const {
      answer_id,
    } = request.params;

    const deleteAnswerService = new DeleteAnswerService();

    const result = await deleteAnswerService.execute(answer_id);

    response.json(result);
  }
}

export default CreateAnswerController;
