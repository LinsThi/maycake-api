import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';

const saleRoutes = Router();

saleRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_product_sold: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  SaleController.create,
);

saleRoutes.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id_product_sold: Joi.string().uuid().required(),
      status: Joi.string().required(),
    },
  }),
  ensureAdmin,
  SaleController.update,
);

export default saleRoutes;
