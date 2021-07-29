/* eslint-disable camelcase */
import 'reflect-metadata';
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteAnswerService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  async execute(answer_id:string) {
    const answer = await this.answersRepository.findById(answer_id);
    if (!answer) {
      throw new AppError('Answer not Found', 404);
    }
    await this.answersRepository.delete(answer_id);
  }
}

export default DeleteAnswerService;
