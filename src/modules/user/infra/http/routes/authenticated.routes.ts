import { Router } from 'express';

import AuthenticatedUserController from '@modules/user/infra/http/controllers/AuthenticatedUserController';

const authenticatedRoutes = Router();

authenticatedRoutes.post('/', AuthenticatedUserController.handle);

export default authenticatedRoutes;
