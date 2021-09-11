/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable camelcase */
import 'reflect-metadata';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { classToPlain } from 'class-transformer';
import ISetSolvedDTO from '../dtos/ISetSolvedDTO';

@injectable()
class CreateComplaintService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute({
    complaint_id, user_id, solved,
  }: ISetSolvedDTO) {
    const complaintFound = await this.complaintsRepository.findById(complaint_id);

    if (!complaintFound) {
      throw new AppError('Complaint not found', 400);
    }

    if (solved !== true && solved !== false) {
      throw new AppError('Invalid solved value', 400);
    }

    if (complaintFound.user_sender !== user_id) {
      throw new AppError('Unauthorized user', 401);
    }

    complaintFound.solved = solved;
    this.complaintsRepository.update(complaintFound);

    return classToPlain(complaintFound);
  }
}
export default CreateComplaintService;
