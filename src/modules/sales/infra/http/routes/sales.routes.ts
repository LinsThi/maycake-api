import { Router } from 'express';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';

const saleRoutes = Router();

saleRoutes.post('/', ensureAuthenticated, SaleController.create);

saleRoutes.put('/', ensureAuthenticated, ensureAdmin, SaleController.update);

export default saleRoutes;
