/* eslint-disable class-methods-use-this */
import DistrictsRepository from '@modules/districts/infra/typeorm/repositories/DistrictsRepository';
import AppError from '@shared/errors/AppError';

class CreateDistrictService {
  async execute(name : string) {
    const districtsRepository = new DistrictsRepository();

    if (!name) {
      throw new AppError('Invalid Tag Name', 401);
    }

    const tagAlreadyExists = await districtsRepository.findByName(
      name,
    );

    if (tagAlreadyExists) {
      throw new AppError('District already exists', 401);
    }

    const district = districtsRepository.create(
      name,
    );

    return district;
  }
}

export default CreateDistrictService;
