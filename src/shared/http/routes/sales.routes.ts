import { Router } from 'express';

import SaleController from '../../../controllers/SaleController';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';
import ensureAdmin from '../../../middlewares/ensureAdmin';

const saleRoutes = Router();

saleRoutes.post('/', ensureAuthenticated, SaleController.create);

saleRoutes.put('/', ensureAuthenticated, ensureAdmin, SaleController.update);

export default saleRoutes;
