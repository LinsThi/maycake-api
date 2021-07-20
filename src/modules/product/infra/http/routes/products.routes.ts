import { Router } from 'express';
import multer from 'multer';

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
  ProductController.create,
);

productRoutes.put(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  ProductController.update,
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