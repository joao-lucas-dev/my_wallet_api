import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { receiptsRoutes } from './receipts.routes';
import { sessionsRoutes } from './sessions.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);

routes.use(ensureAuthenticated);

routes.use('/receipts', receiptsRoutes);

export { routes };
