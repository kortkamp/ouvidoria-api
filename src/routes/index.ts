import { Router, Response } from 'express';
import { CreateUserController } from '../controllers/CreateUserController';
import { CreateDistrictController } from '../controllers/CreateDistrictController';
import { AuthenticateUserController } from '../controllers/AuthenticateUsercontroller';

const apiRoutes = Router();

const createUserController = new CreateUserController();
const createDistrictController = new CreateDistrictController();
const authenticateUserController = new AuthenticateUserController();

apiRoutes.get('/', (_, res: Response) => res.send('api ok'));
apiRoutes.post('/users', createUserController.handle);

apiRoutes.post('/login', authenticateUserController.handle);

apiRoutes.post('/districts', createDistrictController.handle);

// eslint-disable-next-line import/prefer-default-export
export { apiRoutes };
