/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { AnswersRepositories } from '../repositories/AnswersRepositories';

class DeleteAnswerService {
  async execute(answer_id:string) {
    const answersRepositories = getCustomRepository(AnswersRepositories);

    const result = await answersRepositories.delete(answer_id);

    return result;
  }
}

export { DeleteAnswerService };
