import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import DeleteComplaintController from '@modules/complaints/infra/http/controllers/DeleteComplaintController';
import CreateComplaintController from '@modules/complaints/infra/http/controllers/CreateComplaintController';
import ListComplaintsController from '@modules/complaints/infra/http/controllers/ListComplaintsController';
import ListComplaintsByDistrictController from '../controllers/ListComplaintsByDistrictController';

const route = Router();

const deleteComplaintController = new DeleteComplaintController();
const createComplaintController = new CreateComplaintController();
const listComplaintsController = new ListComplaintsController();
const listComplaintsByDistrictController = new ListComplaintsByDistrictController();

export default (app: Router) => {
  app.use('/complaints', route);

  route.get('/', ensureAuthenticated, listComplaintsController.handle);
  route.post('/', ensureAuthenticated, createComplaintController.handle);
  route.delete('/:complaint_id', ensureAuthenticated, deleteComplaintController.handle);
  route.get('/district/:district_id', listComplaintsByDistrictController.handle);
};
