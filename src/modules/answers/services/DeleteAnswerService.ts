/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { AnswersRepositories } from '@modules/answers/infra/typeorm/repositories/AnswersRepositories';

import AppError from '@shared/errors/AppError';

class DeleteAnswerService {
  async execute(answer_id:string) {
    const answersRepositories = getCustomRepository(AnswersRepositories);

    const asnwer = await answersRepositories.findOne(answer_id);
    if (!asnwer) {
      throw new AppError('Answer not Found', 404);
    }

    const result = await answersRepositories.delete(answer_id);

    return result;
  }
}

export { DeleteAnswerService };
