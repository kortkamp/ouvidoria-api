/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import AppError from '@shared/errors/AppError';

const pageDefaultLimit = 10;

@injectable()
class ListComplaintsByUserService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute(user_id:string, sender_id:string, page:string, limit:string) {
    const pageValue = Number(page || 1);
    const limitValue = Number(limit || pageDefaultLimit);

    if (user_id !== sender_id) {
      throw new AppError('Unauthorized', 401);
    }

    if (pageValue < 1 || limitValue < 0) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new AppError('Pagination Error', 400);
    }
    const complaints = await this.complaintsRepository.listByUser(
      sender_id,
      {
        take: limitValue,
        skip: limitValue * (pageValue - 1),
      },
    );
    return classToPlain({
      ...complaints,
      page: pageValue,
      limit: limitValue,
    });
  }
}

export default ListComplaintsByUserService;
