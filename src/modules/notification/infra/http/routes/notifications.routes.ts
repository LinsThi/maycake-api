import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';

import NotificationController from '../controllers/NotificationController';

const notificationRoutes = Router();

notificationRoutes.get(
  '/show',
  ensureAuthenticated,
  NotificationController.show,
);

notificationRoutes.patch(
  '/update',
  ensureAuthenticated,
  NotificationController.update,
);

export default notificationRoutes;
