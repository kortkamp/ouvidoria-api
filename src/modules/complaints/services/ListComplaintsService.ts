/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import AppError from '@shared/errors/AppError';
import { Like } from 'typeorm';
import IFindDTO from '../dtos/IFindDTO';

const pageDefaultLimit = 10;

interface IListComplaintsDTO {
  user_id?: string;
  district_id?:string;
  user_sender?:string;
  search?:string;
  page?:string;
  limit?:string;
}

@injectable()
class ListComplaintsService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute({
    user_id, district_id, user_sender, search, page, limit,
  }:IListComplaintsDTO) {
    const pageValue = Number(page || 1);
    const limitValue = Number(limit || pageDefaultLimit);

    if (pageValue < 1 || limitValue < 0) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new AppError('Pagination Error', 400);
    }

    const listArgs:IFindDTO = {
      filter: {},
      take: limitValue,
      skip: limitValue * (pageValue - 1),
    };
    if (user_sender) {
      listArgs.filter.user_sender = user_sender;
    }
    if (district_id) {
      listArgs.filter.district_id = district_id;
    }
    if (search) {
      listArgs.filter.message = Like(`%${search}%`);
    }

    const complaints = await this.complaintsRepository.list(listArgs);

    return classToPlain({
      ...complaints,
      page: pageValue,
      limit: limitValue,
    });
  }
}

export default ListComplaintsService;
