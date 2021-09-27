import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import CartController from '../controllers/CartController';

const cartRoutes = Router();

cartRoutes.post('/', ensureAuthenticated, CartController.create);

cartRoutes.get('/', ensureAuthenticated, CartController.show);

cartRoutes.put('/', ensureAuthenticated, CartController.delete);

export default cartRoutes;
