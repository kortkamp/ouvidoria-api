/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { DistrictsRepositories } from '@modules/districts/infra/typeorm/repositories/DistrictsRepositories';

class GetDistrictService {
  async execute(district_id:string) {
    const districtsRepositories = getCustomRepository(DistrictsRepositories);

    const district = await districtsRepositories.findOne(district_id, { relations: ['complaints'] });

    return classToPlain(district);
  }
}

export { GetDistrictService };
