import { v4 as uuid } from 'uuid';
import { Answer } from '@modules/answers/infra/typeorm/entities/Answer';
import IAnswersRepository from '@modules/answers/repositories/IAnswersRepository';
import ICreateAnswerDTO from '@modules/answers/dtos/ICreateAnswerDTO';

class FakeAnswersRepository implements IAnswersRepository {
  private answers:Answer[] = [];

  public async create({
    complaint_id,
    user_sender,
    message,
    deadline,
  }:ICreateAnswerDTO): Promise<Answer> {
    const answer = new Answer();

    Object.assign(answer, {
      id: uuid(),
      complaint_id,
      user_sender,
      message,
      deadline,
    });

    this.answers.push(answer);

    return answer;
  }

  public async findById(id:string):Promise<Answer | undefined> {
    const district = this.answers.find((answer) => answer.id === id);

    return district;
  }

  public async listAll():Promise<Answer[]> {
    return this.answers;
  }

  public async delete(id:string):Promise<void> {
    this.answers.filter((answer) => answer.id !== id);
  }
}

export default FakeAnswersRepository;
