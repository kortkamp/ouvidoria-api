/* eslint-disable class-methods-use-this */
import { classToPlain } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import IComplaintsRepository from '@modules/complaints/repositories/IComplaintsRepository';
import AppError from '@shared/errors/AppError';

const pageDefaultLimit = 10;

@injectable()
class ListComplaintsByDistrictService {
  constructor(
    @inject('ComplaintsRepository')
    private complaintsRepository: IComplaintsRepository,
  ) {}

  async execute(district_id:string, page:string, limit:string) {
    // console.log(`${page} --- ${limit}`);

    const pageValue = Number(page || 1);
    const limitValue = Number(limit || pageDefaultLimit);

    if (pageValue < 1 || limitValue < 0) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new AppError('Pagination Error', 400);
    }
    const complaints = await this.complaintsRepository.listByDistrict(
      district_id,
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

export default ListComplaintsByDistrictService;
