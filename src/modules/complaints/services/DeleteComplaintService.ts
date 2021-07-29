/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable camelcase */
import 'reflect-metadata';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import IDistrictsRepository from '@modules/districts/repositories/IDistrictRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDeleteComplaintDTO from '../dtos/IDeleteComplaintDTO';

@injectable()
class DeleteComplaintService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
    @inject('DistrictsRepository')
    private districtsRepository: IDistrictsRepository,
  ) {}

  async execute({
    complaint_id, user_sender,
  }: IDeleteComplaintDTO) {
    // must check if user_sender is admin or complaint author
    const complaint = await this.complaintsRepository.findById(
      complaint_id,
    );
    if (!complaint) {
      throw new AppError('Complaint not Found', 404);
    }
    if (complaint?.user_sender !== user_sender) {
      throw new AppError('User is not the complaint author', 401);
    }
    await this.complaintsRepository.delete(
      complaint_id,
    );
  }
}
export default DeleteComplaintService;
