import { request } from 'express';
import { getCustomRepository } from 'typeorm';

import Product from '../infra/typeorm/entities/Product';

import ProductRepositories from '../infra/typeorm/repositories/ProductRepositories';
import AppError from '@shared/errors/AppError';

interface IRequest {
  product_id?: string;
  name: string;
  description: string;
  value: string;
  photo?: string;
}

interface IProductInfo {
  product_id: string;
}

export default class ProductService {
  async create({ name, description, value, photo = '' }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepositories);

    const productExists = await productsRepository.findOne({ name });

    if (productExists) {
      throw new AppError('Product already exists!');
    }

    const product = productsRepository.create({
      name,
      description,
      value,
      photo,
    });

    await productsRepository.save(product);

    request.product_id = product.id;

    return product;
  }

  async update({ product_id, name, description, value }: IRequest) {
    const productsRepository = getCustomRepository(ProductRepositories);

    const product = await productsRepository.findOne(product_id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    const nameAlreadyExists = await productsRepository.findOne({ name });

    if (nameAlreadyExists) {
      throw new AppError('Product with the same name is already registered');
    }

    product.name = name;
    product.description = description;
    product.value = value;

    await productsRepository.save(product);

    return product;
  }

  async index(): Promise<Product[]> {
    let products: Product[];

    const productsRepository = getCustomRepository(ProductRepositories);

    products = await productsRepository.find();

    return products;
  }

  async show({ product_id }: IProductInfo): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepositories);

    const product = await productsRepository.findOne(product_id);

    return product;
  }
}
