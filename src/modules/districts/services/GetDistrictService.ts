/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import IDistrictsRepository from '@modules/districts/repositories/IDistrictRepository';
import { inject, injectable } from 'tsyringe';

/**
 class CreateDistrictService {

     */

@injectable()
class GetDistrictService {
  constructor(
    @inject('DistrictsRepository')
    private districtsRepository: IDistrictsRepository,
  ) {}

  async execute(district_id:string) {
    const district = await this.districtsRepository.findWithRelations(district_id, 'complaints');

    return classToPlain(district);
  }
}

export default GetDistrictService;
