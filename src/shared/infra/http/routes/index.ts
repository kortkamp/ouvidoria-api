import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import districtsRouter from '@modules/districts/infra/http/routes/districts.routes';
import complaitsRouter from '@modules/complaints/infra/http/routes/complaints.routes';
import answersRouter from '@modules/answers/infra/http/routes/answers.routes';
import authsRouter from '@modules/users/infra/http/routes/auths.routes';

import atachUserId from '../middlewares/atachUserId';

const apiRoutes = Router();

apiRoutes.use(atachUserId);

usersRouter(apiRoutes);
authsRouter(apiRoutes);
districtsRouter(apiRoutes);
complaitsRouter(apiRoutes);
answersRouter(apiRoutes);

export default apiRoutes;
