/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';

@injectable()
class ListComplaintsByUserService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute(user:string) {
    const complaints = await this.complaintsRepository.listByUser(user);
    return classToPlain(complaints);
  }
}

export default ListComplaintsByUserService;
