import { Router } from 'express';

import users from './users';
import districts from './districts';
import complaints from './complaints';
import auth from './auth';

const apiRoutes = Router();

users(apiRoutes);
auth(apiRoutes);
districts(apiRoutes);
complaints(apiRoutes);

export default apiRoutes;
