/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import ICreateAnswerDTO from '@modules/answers/dtos/ICreateAnswerDTO';
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import AppError from '@shared/errors/AppError';
import { getRepository, Repository } from 'typeorm';

import { Answer } from '../entities/Answer';

class AnswersRepository implements IAnswersRepository {
  private ormRepository: Repository<Answer>;

  constructor() {
    this.ormRepository = getRepository(Answer);
  }

  public async create({
    complaint_id,
    user_sender,
    message,
  }:ICreateAnswerDTO):Promise<Answer> {
    const answer = this.ormRepository.create({
      complaint_id,
      user_sender,
      message,
    });
    await this.ormRepository.save(answer);
    return answer;
  }

  public async findById(id:string):Promise<Answer | undefined> {
    const answerFound = await this.ormRepository.findOne({
      where: { id },
    });
    return answerFound;
  }

  public async listAll():Promise<Answer[]> {
    const answers = await this.ormRepository.find();
    return answers;
  }

  public async delete(id:string):Promise<void> {
    const answer = await this.findById(id);
    if (!answer) {
      throw new AppError('Answer does not exists', 400);
    } else {
      await this.ormRepository.delete(answer);
    }
  }
}

export default AnswersRepository;