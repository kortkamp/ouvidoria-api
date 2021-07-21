import { Router } from 'express';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import CreateAnswerController from '@modules/answers/infra/http/controllers/CreateAnswerController';

const route = Router();

const createAnswerController = new CreateAnswerController();

export default (app: Router) => {
  app.use('/answers', route);

  route.post('/', ensureAuthenticated, createAnswerController.handle);
};
