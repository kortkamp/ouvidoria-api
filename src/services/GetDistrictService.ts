/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { getCustomRepository } from 'typeorm';
import { DistrictsRepositories } from '../repositories/DistrictsRepositories';
import { ComplaintsRepositories } from '../repositories/ComplaintsRepositories';
import { District } from '../entities/District';
import { Complaint } from '../entities/Complaint';

interface IDistrict extends District {
  complaints:Complaint[];
}

class GetDistrictService {
  async execute(district_id:string) {
    const districtsRepositories = getCustomRepository(DistrictsRepositories);
    const complaintsRepositories = getCustomRepository(ComplaintsRepositories);

    const district = await districtsRepositories.findOne(district_id) as IDistrict;

    const complaints = await complaintsRepositories.find({ where: { district_id } });

    district.complaints = complaints;

    return classToPlain(district);
  }
}

export { GetDistrictService };
