/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteAnswerService {
  constructor(
    @inject('AnswersRepository')
    private answersRepository: IAnswersRepository,
  ) {}

  async execute(answer_id:string) {
    const result = await this.answersRepository.delete(answer_id);

    return result;
  }
}

export default DeleteAnswerService;
