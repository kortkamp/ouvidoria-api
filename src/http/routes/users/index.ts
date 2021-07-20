import { Router } from 'express';

import CreateUserController from '../../controllers/CreateUserController';

const route = Router();

const createUserController = new CreateUserController();

export default (app: Router) => {
  app.use('/users', route);

  route.post('/', createUserController.handle);
};
