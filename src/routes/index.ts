import { Router, Response } from 'express';

const apiRoutes = Router();

apiRoutes.get('/', (_, res: Response) => res.send('ok'));

// eslint-disable-next-line import/prefer-default-export
export { apiRoutes };
