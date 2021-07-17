import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import CreateDistrictController from '../../controllers/CreateDistrictController';
import ListDistrictsController from '../../controllers/ListDistrictsController';

const route = Router();

const listDistrictsController = new ListDistrictsController();
const createDistrictController = new CreateDistrictController();

export default (app: Router) => {
  app.use('/districts', route);

  route.get('/', listDistrictsController.handle);
  route.post('/', ensureAuthenticated, createDistrictController.handle);
};
