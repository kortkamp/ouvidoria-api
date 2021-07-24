/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';

@injectable()
class ListComplaintsService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute() {
    const complaints = await this.complaintsRepository.listAll();
    return classToPlain(complaints);
  }
}

export default ListComplaintsService;
