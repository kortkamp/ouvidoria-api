/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import DistrictsRepository from '@modules/districts/infra/typeorm/repositories/DistrictsRepository';

class ListDistrictsService {
  async execute() {
    const districtsRepository = new DistrictsRepository();

    const districts = await districtsRepository.listAll();

    return classToPlain(districts);
  }
}

export default ListDistrictsService;
