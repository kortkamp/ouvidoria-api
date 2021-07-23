/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import DistrictsRepository from '@modules/districts/infra/typeorm/repositories/DistrictsRepository';

class GetDistrictService {
  async execute(district_id:string) {
    const districtsRepository = new DistrictsRepository();

    // eslint-disable-next-line max-len
    const district = await districtsRepository.findById(district_id); // , { relations: ['complaints'] }

    return classToPlain(district);
  }
}

export default GetDistrictService;
