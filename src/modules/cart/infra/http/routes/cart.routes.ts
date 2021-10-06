import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import CartController from '../controllers/CartController';

const cartRoutes = Router();

cartRoutes.post('/', ensureAuthenticated, CartController.create);

cartRoutes.get('/', ensureAuthenticated, CartController.show);

cartRoutes.delete('/', ensureAuthenticated, CartController.delete);

cartRoutes.put('/updatecart', ensureAuthenticated, CartController.update);

cartRoutes.put(
  '/removeproductcart',
  ensureAuthenticated,
  CartController.remove,
);

export default cartRoutes;
