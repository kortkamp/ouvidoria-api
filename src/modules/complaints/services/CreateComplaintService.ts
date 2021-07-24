/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable camelcase */

import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import IDistrictsRepository from '@modules/districts/repositories/IDistrictRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateComplaintDTO from '../dtos/ICreateComplaintDTO';

@injectable()
class CreateComplaintService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
    @inject('DistrictsRepository')
    private districtsRepository: IDistrictsRepository,
  ) {}

  async execute({
    district_id, user_sender, message,
  }: ICreateComplaintDTO) {
    const districtExists = await this.districtsRepository.findById(district_id);
    if (!districtExists) {
      throw new AppError('District does not exists', 401);
    }
    const complaint = await this.complaintsRepository.create({
      district_id,
      user_sender,
      message,
    });
    return complaint;
  }
}
export default CreateComplaintService;
