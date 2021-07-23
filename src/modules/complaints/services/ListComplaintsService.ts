/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';

class ListComplaintsService {
  async execute() {
    const complaintsRepositories = getCustomRepository(ComplaintsRepository);

    const complaints = await complaintsRepositories.listAll();
    return classToPlain(complaints);
  }
}

export default ListComplaintsService;
