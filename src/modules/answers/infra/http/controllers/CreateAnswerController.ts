/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAnswerService from '@modules/answers/services/CreateAnswerService';

class CreateAnswerController {
  async handle(request: Request, response: Response) {
    const {
      complaint_id, message,
    } = request.body;

    const { user_id } = request;

    const createAnswerService = container.resolve(CreateAnswerService);

    const compliment = await createAnswerService.execute({
      complaint_id, user_sender: user_id, message,
    });

    response.json(compliment);
  }
}

export default CreateAnswerController;
