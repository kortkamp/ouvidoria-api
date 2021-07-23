/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */

import { getCustomRepository } from 'typeorm';
import { AnswersRepositories } from '@modules/answers/infra/typeorm/repositories/AnswersRepositories';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';
import AppError from '@shared/errors/AppError';
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';

class CreateAnswerService {
  async execute({
    complaint_id, user_sender, message,
  }: ICreateAnswerDTO) {
    const answersRepositories = getCustomRepository(AnswersRepositories);
    const complaintsRepositories = new ComplaintsRepository();

    const complaintExists = await complaintsRepositories.findById(complaint_id);

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
export default CreateAnswerService;
