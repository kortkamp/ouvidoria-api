/* eslint-disable class-methods-use-this */

import { getCustomRepository } from 'typeorm';
import { ComplaintsRepositories } from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepositories';
import { DistrictsRepositories } from '@modules/districts/infra/typeorm/repositories/DistrictsRepositories';
import AppError from '@shared/errors/AppError';
import ICreateComplaintDTO from '../dtos/ICreateComplaintDTO';
/* eslint-disable camelcase */

class CreateComplaintService {
  async execute({
    district_id, user_sender, message,
  }: ICreateComplaintDTO) {
    const complaintsRepositories = getCustomRepository(ComplaintsRepositories);
    const districtsRepositories = getCustomRepository(DistrictsRepositories);

    const districtExists = await districtsRepositories.findOne(district_id);

    if (!districtExists) {
      throw new AppError('District does not exists', 401);
    }

    const compliment = complaintsRepositories.create({
      district_id,
      user_sender,
      message,
    });

    await complaintsRepositories.save(compliment);

    return compliment;
  }
}
export { CreateComplaintService };
