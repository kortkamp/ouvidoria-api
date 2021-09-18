import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import DeleteComplaintController from '@modules/complaints/infra/http/controllers/DeleteComplaintController';
import CreateComplaintController from '@modules/complaints/infra/http/controllers/CreateComplaintController';
import ListComplaintsController from '@modules/complaints/infra/http/controllers/ListComplaintsController';
import ListComplaintsByDistrictController from '../controllers/ListComplaintsByDistrictController';
import ListComplaintsByUserController from '../controllers/ListComplaintsByUserController';
import SetSolvedController from '../controllers/SetSolvedController';

const route = Router();

const deleteComplaintController = new DeleteComplaintController();
const createComplaintController = new CreateComplaintController();
const listComplaintsController = new ListComplaintsController();
const listComplaintsByDistrictController = new ListComplaintsByDistrictController();
const listComplaintsByUserController = new ListComplaintsByUserController();
const setSolvedController = new SetSolvedController();

export default (app: Router) => {
  app.use('/complaints', route);

  route.get('/', listComplaintsController.handle);
  route.post('/', ensureAuthenticated, createComplaintController.handle);
  route.delete('/:complaint_id', ensureAuthenticated, deleteComplaintController.handle);
  route.get('/district/:district_id', listComplaintsByDistrictController.handle);
  route.get('/user/:sender_id', ensureAuthenticated, listComplaintsByUserController.handle);
  route.put('/:complaint_id', ensureAuthenticated, setSolvedController.handle);
};
