import { EntityRepository, Repository } from 'typeorm';
import { Complaint } from '../entities/Complaint';

@EntityRepository(Complaint)
class ComplaintsRepositories extends Repository<Complaint> {

}

export { ComplaintsRepositories };
