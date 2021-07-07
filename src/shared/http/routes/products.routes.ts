import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';
import ensureAdmin from '../../../middlewares/ensureAdmin';

import ProductController from '../../../controllers/ProductController';
import UpdateProductPhotoService from '../../../services/UpdateProductPhotoService';

import uploadPhoto from '../config/uploadPhoto';

const productRoutes = Router();
const uploadPht = multer(uploadPhoto);

productRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  ProductController.create,
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
