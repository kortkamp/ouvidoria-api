/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListComplaintsByDistrictService from '@modules/complaints/services/ListComplaintsByDistrictService';

class ListComplaintsByDistrictController {
  async handle(request:Request, response:Response) {
    const { district_id } = request.params;
    const { page, limit } = request.query;
    const listComplaintsByDistrictService = container.resolve(ListComplaintsByDistrictService);

    const districts = await listComplaintsByDistrictService.execute(
      district_id,
      page as string,
      limit as string,
    );

    return response.json(districts);
  }
}

export default ListComplaintsByDistrictController;
