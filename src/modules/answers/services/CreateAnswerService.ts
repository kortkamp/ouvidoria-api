/* eslint-disable class-methods-use-this */

import { getCustomRepository } from 'typeorm';
import { AnswersRepositories } from '@modules/answers/infra/typeorm/repositories/AnswersRepositories';
import { ComplaintsRepositories } from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepositories';
import AppError from '@shared/errors/AppError';

/* eslint-disable camelcase */
interface IAnswerRequest {
  complaint_id: string;
  user_sender:string;
  message: string;
}

class CreateAnswerService {
  async execute({
    complaint_id, user_sender, message,
  }: IAnswerRequest) {
    const answersRepositories = getCustomRepository(AnswersRepositories);
    const complaintsRepositories = getCustomRepository(ComplaintsRepositories);

    const complaintExists = await complaintsRepositories.findOne(complaint_id);

    if (!complaintExists) {
      throw new AppError('Complaint does not exists', 401);
    }

    const compliment = answersRepositories.create({
      complaint_id,
      user_sender,
      message,
    });

    await answersRepositories.save(compliment);

    return compliment;
  }
}
export { CreateAnswerService };
