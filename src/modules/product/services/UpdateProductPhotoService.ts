import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import ProductRepositories from '../infra/typeorm/repositories/ProductRepositories';

import Product from '../infra/typeorm/entities/Product';

import uploadPhoto from '@shared/http/config/uploadPhoto';
import AppError from '@shared/errors/AppError';

interface IRequest {
  product_id: string;
  productFileName: string;
}

export default class UpdateProductPhotoService {
  async execute({ product_id, productFileName }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepositories);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    if (product.photo) {
      const productPhotoFilePath = path.join(
        uploadPhoto.directory,
        product.photo,
      );

      const productPhotoFileExists = await fs.promises.stat(
        productPhotoFilePath,
      );
      if (productPhotoFileExists) {
        await fs.promises.unlink(productPhotoFilePath);
      }
    }

    product.photo = productFileName;

    await productsRepository.save(product);

    return product;
  }
}
