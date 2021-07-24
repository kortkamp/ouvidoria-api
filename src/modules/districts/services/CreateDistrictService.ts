/* eslint-disable class-methods-use-this */
import IDistrictsRepository from '@modules/districts/repositories/IDistrictRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateDistrictService {
  constructor(
    @inject('DistrictsRepository')
    private districtsRepository: IDistrictsRepository,
  ) {}

  async execute(name : string) {
    // const districtsRepository = new DistrictsRepository();

    if (!name) {
      throw new AppError('Invalid Tag Name', 401);
    }

    const tagAlreadyExists = await this.districtsRepository.findByName(
      name,
    );

    if (tagAlreadyExists) {
      throw new AppError('District already exists', 401);
    }

    const district = this.districtsRepository.create(
      name,
    );

    return district;
  }
}

export default CreateDistrictService;
