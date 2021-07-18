import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import CreateDistrictController from '../../controllers/CreateDistrictController';
import ListDistrictsController from '../../controllers/ListDistrictsController';
import GetDistrictController from '../../controllers/GetDistrictController';

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
