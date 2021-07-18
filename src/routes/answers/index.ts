import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import CreateAnswerController from '../../controllers/CreateAnswerController';

const route = Router();

const createAnswerController = new CreateAnswerController();

export default (app: Router) => {
  app.use('/answers', route);

  route.post('/', ensureAuthenticated, createAnswerController.handle);
};
