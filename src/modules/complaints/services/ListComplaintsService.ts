/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';

class ListComplaintsService {
  async execute() {
    const complaintsRepositories = new ComplaintsRepository();

    const complaints = await complaintsRepositories.listAll();
    return classToPlain(complaints);
  }
}

export default ListComplaintsService;
