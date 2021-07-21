/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { DistrictsRepositories } from '@modules/districts/infra/typeorm/repositories/DistrictsRepositories';

class CreateDistrictService {
  async execute(name : string) {
    const districtsRepositories = getCustomRepository(DistrictsRepositories);

    if (!name) {
      throw new Error('Invalid Tag Name');
    }

    const tagAlreadyExists = await districtsRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new Error('District already exists');
    }

    const tag = districtsRepositories.create({
      name,
    });

    await districtsRepositories.save(tag);
    return tag;
  }
}

export { CreateDistrictService };
