/* eslint-disable class-methods-use-this */

import { getCustomRepository } from 'typeorm';
import { AnswersRepositories } from '../repositories/AnswersRepositories';
import { ComplaintsRepositories } from '../repositories/ComplaintsRepositories';

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
      throw new Error('Complaint does not exists');
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
