import { Router } from 'express';

import CreateUserController from '@modules/users/infra/http/controllers/CreateUserController';
import GetUserController from '../controllers/GetUserController';

const route = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

export default (app: Router) => {
  app.use('/users', route);

  route.post('/', createUserController.handle);

  route.get('/:user_id', getUserController.handle);
};
