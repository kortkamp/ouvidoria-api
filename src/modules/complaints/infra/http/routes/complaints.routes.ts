import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateComplaintController from '@modules/complaints/infra/http/controllers/CreateComplaintController';
import ListComplaintsController from '@modules/complaints/infra/http/controllers/ListComplaintsController';

const route = Router();

const createComplaintController = new CreateComplaintController();
const listComplaintsController = new ListComplaintsController();

export default (app: Router) => {
  app.use('/complaints', route);

  route.get('/', ensureAuthenticated, listComplaintsController.handle);
  route.post('/', ensureAuthenticated, createComplaintController.handle);
};
