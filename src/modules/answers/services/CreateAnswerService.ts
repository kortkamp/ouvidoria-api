/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import 'reflect-metadata';
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateAnswerDTO from '../dtos/ICreateAnswerDTO';

/**
 class CreateDistrictService {
   */
@injectable()
class CreateAnswerService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute({
    complaint_id, user_sender, message,
  }: ICreateAnswerDTO) {
    if (!message) {
      throw new AppError('Empty message', 400);
    }
    const complaintExists = await this.complaintsRepository.findById(complaint_id);

    if (!complaintExists) {
      throw new AppError('Complaint does not exists', 400);
    }

    const answer = this.answersRepository.create({
      complaint_id,
      user_sender,
      message,
    });

    return answer;
  }
}
export default CreateAnswerService;
