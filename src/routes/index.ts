import { Router, Response } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';

const apiRoutes = Router();

const createUserController = new CreateUserController();

apiRoutes.get('/', (_, res: Response) => res.send('ok'));
apiRoutes.post('/users', createUserController.handle);

// eslint-disable-next-line import/prefer-default-export
export { apiRoutes };
