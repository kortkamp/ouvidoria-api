/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { CreateAnswerService } from '../../services/CreateAnswerService';

class CreateAnswerController {
  async handle(request: Request, response: Response) {
    const {
      complaint_id, message,
    } = request.body;

    const { user_id } = request;

    const createAnswerService = new CreateAnswerService();

    const compliment = await createAnswerService.execute({
      complaint_id, user_sender: user_id, message,
    });

    response.json(compliment);
  }
}

export default CreateAnswerController;
