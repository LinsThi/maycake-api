import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import AddressController from '../controllers/AddressController';

const addressRoutes = Router();

addressRoutes.get('/', ensureAuthenticated, AddressController.show);

addressRoutes.post('/', ensureAuthenticated, AddressController.create);

addressRoutes.get('/list', ensureAuthenticated, AddressController.list);

export default addressRoutes;
