/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';

import { GetDistrictService } from '../../services/GetDistrictService';

class ListDistrictsController {
  async handle(request:Request, response:Response) {
    const { district_id } = request.params;
    const getDistrictService = new GetDistrictService();

    const district = await getDistrictService.execute(district_id);

    return response.json(district);
  }
}

export default ListDistrictsController;
