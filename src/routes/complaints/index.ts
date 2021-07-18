import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import CreateComplaintController from '../../controllers/CreateComplaintController';
import ListComplaintsController from '../../controllers/ListComplaintsController';

const route = Router();

const createComplaintController = new CreateComplaintController();
const listComplaintsController = new ListComplaintsController();

export default (app: Router) => {
  app.use('/complaints', route);

  route.get('/', ensureAuthenticated, listComplaintsController.handle);
  route.post('/', ensureAuthenticated, createComplaintController.handle);
};
