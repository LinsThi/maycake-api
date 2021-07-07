import { Router } from 'express';

import CreateSaleController from '../../../controllers/CreateSaleController';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';
import ensureAdmin from '../../../middlewares/ensureAdmin';

const saleRoutes = Router();

saleRoutes.post('/', ensureAuthenticated, CreateSaleController.handle);

export default saleRoutes;
