/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

import { getCustomRepository } from 'typeorm';
import ComplaintsRepository from '@modules/complaints/infra/typeorm/repositories/ComplaintsRepository';
import DistrictsRepository from '@modules/districts/infra/typeorm/repositories/DistrictsRepository';
import AppError from '@shared/errors/AppError';
import ICreateComplaintDTO from '../dtos/ICreateComplaintDTO';

class CreateComplaintService {
  async execute({
    district_id, user_sender, message,
  }: ICreateComplaintDTO) {
    const complaintsRepository = new ComplaintsRepository();
    const districtsRepository = getCustomRepository(DistrictsRepository);

    const districtExists = await districtsRepository.findById(district_id);

    if (!districtExists) {
      throw new AppError('District does not exists', 401);
    }

    const compliment = complaintsRepository.create({
      district_id,
      user_sender,
      message,
    });

    return compliment;
  }
}
export { CreateComplaintService };
