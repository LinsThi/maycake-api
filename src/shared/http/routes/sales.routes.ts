import { Router } from 'express';

import SaleController from '../../../controllers/SaleController';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';
import ensureAdmin from '../../../middlewares/ensureAdmin';

const saleRoutes = Router();

saleRoutes.post('/', ensureAuthenticated, SaleController.create);

export default saleRoutes;
