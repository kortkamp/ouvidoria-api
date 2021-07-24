/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import IDistrictsRepository from '@modules/districts/repositories/IDistrictRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListDistrictsService {
  constructor(
    @inject('DistrictsRepository')
    private districtsRepository: IDistrictsRepository,
  ) {}

  async execute() {
    const districts = await this.districtsRepository.listAll();

    return classToPlain(districts);
  }
}

export default ListDistrictsService;
