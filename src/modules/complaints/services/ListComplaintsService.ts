/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { ComplaintsRepositories } from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepositories';

class ListComplaintsService {
  async execute() {
    const complaintsRepositories = getCustomRepository(ComplaintsRepositories);

    const complaints = await complaintsRepositories.find({
      // relations: ['user'],
      // select: ['id', 'message', 'user'],
    });
    return classToPlain(complaints);
  }
}

export { ListComplaintsService };
