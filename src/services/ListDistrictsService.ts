/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';
import { DistrictsRepositories } from '../repositories/DistrictsRepositories';

class ListDistrictsService {
  async execute() {
    const districtsRepositories = getCustomRepository(DistrictsRepositories);

    const districts = await districtsRepositories.find();

    return classToPlain(districts);
  }
}

export { ListDistrictsService };
