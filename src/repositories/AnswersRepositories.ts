import { EntityRepository, Repository } from 'typeorm';
import { Answer } from '../entities/Answer';

@EntityRepository(Answer)
class AnswersRepositories extends Repository<Answer> {

}

export { AnswersRepositories };
