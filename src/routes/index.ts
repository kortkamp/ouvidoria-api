import { Router } from 'express';
import { Request, Response } from 'express';

const apiRoutes = Router();

apiRoutes.get('/' , (_,res: Response )  => {
  return res.send('ok');
})

export { apiRoutes };
