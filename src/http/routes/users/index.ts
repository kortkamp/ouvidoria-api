import { Router } from 'express';

import CreateUserController from '../../controllers/CreateUserController';
import validateUser from '../../middlewares/validators/createUser';

const route = Router();

const createUserController = new CreateUserController();

export default (app: Router) => {
  app.use('/users', route);

  route.post('/', validateUser, createUserController.handle);
};
