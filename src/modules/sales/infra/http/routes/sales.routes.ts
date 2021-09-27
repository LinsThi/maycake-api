import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import SaleController from '@modules/sales/infra/http/controllers/SaleController';
import UpdateConfirmPaySaleService from '@modules/sales/services/UpdateConfirmPaySaleService';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';
import uploadConfirmPay from '@config/uploadConfirmPay';

const saleRoutes = Router();
const uploadPay = multer(uploadConfirmPay);

saleRoutes.get('/list', ensureAuthenticated, ensureAdmin, SaleController.index);

saleRoutes.get('/show', ensureAuthenticated, ensureAdmin, SaleController.show);

saleRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_product_sold: Joi.string().uuid().required(),
      address_id_user: Joi.string().uuid().required(),
      methodpay: Joi.string().required(),
      troco: Joi.string(),
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
      id_sale: Joi.string().uuid().required(),
      status: Joi.string().required(),
    },
  }),
  ensureAdmin,
  SaleController.update,
);

saleRoutes.patch(
  '/confirmPay',
  ensureAuthenticated,
  uploadPay.single('confirmPay'),
  async (request, response) => {
    const updateConfirm = new UpdateConfirmPaySaleService();

    const sale = await updateConfirm.execute({
      user_id: request.user_id,
      sale_id: request.sale_id,
      imgConfirmPay: request.file.filename,
    });

    return response.json(sale);
  },
);

export default saleRoutes;
