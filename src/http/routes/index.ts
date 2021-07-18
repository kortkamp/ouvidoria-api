import { Router } from 'express';

import atachUserId from '../middlewares/atachUserId';

import users from './users';
import districts from './districts';
import complaints from './complaints';
import answers from './answers';
import auth from './auth';

const apiRoutes = Router();

apiRoutes.use(atachUserId);

users(apiRoutes);
auth(apiRoutes);
districts(apiRoutes);
complaints(apiRoutes);
answers(apiRoutes);

export default apiRoutes;
