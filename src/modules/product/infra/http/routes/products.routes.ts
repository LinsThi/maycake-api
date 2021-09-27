import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';

import ProductController from '@modules/product/infra/http/controllers/ProductController';
import UpdateProductPhotoService from '@modules/product/services/UpdateProductPhotoService';

import uploadPhoto from '@shared/http/config/uploadPhoto';

const productRoutes = Router();
const uploadPht = multer(uploadPhoto);

productRoutes.get('/list', ensureAuthenticated, ProductController.index);

productRoutes.get('/info', ensureAuthenticated, ProductController.show);

productRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.string().required(),
    },
  }),
  ProductController.create,
);

productRoutes.put(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.string().required(),
    },
  }),
  ProductController.update,
);

productRoutes.put(
  '/visibleAlter',
  ensureAuthenticated,
  ensureAdmin,
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      visible: Joi.bool().required(),
    },
  }),
  ProductController.alterVisible,
);

productRoutes.patch(
  '/photo',
  ensureAuthenticated,
  ensureAdmin,
  uploadPht.single('photo'),
  async (request, response) => {
    const updateProductPhotoService = new UpdateProductPhotoService();
    const product = await updateProductPhotoService.execute({
      product_id: request.product_id,
      productFileName: request.file.filename,
    });

    return response.json(product);
  },
);

export default productRoutes;
