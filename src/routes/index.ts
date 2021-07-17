import { Router } from 'express';

import users from './users';
import districts from './districts';
import auth from './auth';

const apiRoutes = Router();

users(apiRoutes);
auth(apiRoutes);
districts(apiRoutes);

export default apiRoutes;
