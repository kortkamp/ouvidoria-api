/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { DistrictsRepositories } from '@modules/districts/infra/typeorm/repositories/DistrictsRepositories';
import AppError from '@shared/errors/AppError';

class CreateDistrictService {
  async execute(name : string) {
    const districtsRepositories = getCustomRepository(DistrictsRepositories);

    if (!name) {
      throw new AppError('Invalid Tag Name', 401);
    }

    const tagAlreadyExists = await districtsRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new AppError('District already exists', 401);
    }

    const tag = districtsRepositories.create({
      name,
    });

    await districtsRepositories.save(tag);
    return tag;
  }
}

export { CreateDistrictService };
