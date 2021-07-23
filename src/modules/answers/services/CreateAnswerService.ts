/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */

import AnswersRepository from '@modules/answers/infra/typeorm/repositories/AnswersRepository';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';
import AppError from '@shared/errors/AppError';
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';

class CreateAnswerService {
  async execute({
    complaint_id, user_sender, message,
  }: ICreateAnswerDTO) {
    const answersRepository = new AnswersRepository();
    const complaintsRepositories = new ComplaintsRepository();

    const complaintExists = await complaintsRepositories.findById(complaint_id);

    if (!complaintExists) {
      throw new AppError('Complaint does not exists', 400);
    }

    const answer = answersRepository.create({
      complaint_id,
      user_sender,
      message,
    });

    return answer;
  }
}
export default CreateAnswerService;
