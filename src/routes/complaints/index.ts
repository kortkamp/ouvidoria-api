import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import CreateComplaintController from '../../controllers/CreateComplaintController';

const route = Router();

const createComplaintController = new CreateComplaintController();

export default (app: Router) => {
  app.use('/complaints', route);

  route.post('/', ensureAuthenticated, createComplaintController.handle);
};
