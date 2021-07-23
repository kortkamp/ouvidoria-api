/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Answer } from '@modules/answers/infra/typeorm/entities/Answer';
import ICreateComplaintDTO from '@modules/answers/dtos/ICreateAnswerDTO';

interface IAnswersRepository {
  create(answer: ICreateComplaintDTO): Promise<Answer>;
  findById(id:string):Promise<Answer | undefined>;
  listAll():Promise<Answer[]>;
  delete(id:string):Promise<void>;
}

export default IAnswersRepository;
