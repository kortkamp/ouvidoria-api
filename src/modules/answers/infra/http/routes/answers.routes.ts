import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateAnswerController from '@modules/answers/infra/http/controllers/CreateAnswerController';
import DeleteAnswerController from '@modules/answers/infra/http/controllers/DeleteAnswerController';
import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';

const route = Router();

const createAnswerController = new CreateAnswerController();
const deleteAnswerController = new DeleteAnswerController();

export default (app: Router) => {
  app.use('/answers', route);

  route.post('/', ensureAuthenticated, ensureAdmin, createAnswerController.handle);
  route.delete('/:answer_id', ensureAuthenticated, ensureAdmin, deleteAnswerController.handle);
};
