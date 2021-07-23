/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import AnswersRepository from '@modules/answers/infra/typeorm/repositories/AnswersRepository';

class DeleteAnswerService {
  async execute(answer_id:string) {
    const answersRepository = new AnswersRepository();

    const result = await answersRepository.delete(answer_id);

    return result;
  }
}

export default DeleteAnswerService;
