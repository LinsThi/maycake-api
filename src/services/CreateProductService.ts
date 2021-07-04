import { request } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductRepositories from '../repositories/ProductRepositories';
import AppError from '../shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  value: string;
  photo?: string;
}

export default class CreateProductService {
  async execute({ name, description, value, photo = '' }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepositories);

    const productExists = await productsRepository.findOne({name});

    if(productExists) {
      throw new AppError('Product already exists!');
    }

    const product = productsRepository.create({
      name,
      description,
      value,
      photo
    });

    await productsRepository.save(product);

    request.product_id = product.id;

    return product;
  }
}