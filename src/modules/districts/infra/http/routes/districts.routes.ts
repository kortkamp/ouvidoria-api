import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateDistrictController from '@modules/districts/infra/http/controllers/CreateDistrictController';
import ListDistrictsController from '@modules/districts/infra/http/controllers/ListDistrictsController';
import GetDistrictController from '@modules/districts/infra/http/controllers/GetDistrictController';

const route = Router();

const listDistrictsController = new ListDistrictsController();
const createDistrictController = new CreateDistrictController();
const getDistrictController = new GetDistrictController();

export default (app: Router) => {
  app.use('/districts', route);

  route.get('/', listDistrictsController.handle);
  route.get('/:district_id', getDistrictController.handle);
  route.post('/', ensureAuthenticated, createDistrictController.handle);
};
