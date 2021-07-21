import { Router } from 'express';

import AuthenticateUserController from '@modules/users/infra/http/controllers/AuthenticateUserController';

const route = Router();

const authenticateUsercontroller = new AuthenticateUserController();

export default (app: Router) => {
  app.use('/login', route);

  route.post('/', authenticateUsercontroller.handle);
};
