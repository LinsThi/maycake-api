import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ProductService from '../services/ProductService';

class ProductController {
  async create(request: Request, response: Response) {
    const { name, description, value, photo } = request.body;

    const productService = new ProductService();

    const product = await productService.create({
      name,
      description,
      value,
      photo,
    });

    return response.json(product);
  }

  async update(request: Request, response: Response) {
    const { product_id, name, description, value } = request.body;

    const productService = new ProductService();

    const product = await productService.update({
      product_id,
      name,
      description,
      value,
    });

    return response.json(product);
  }

  async index(request: Request, response: Response) {
    const productService = new ProductService();

    const products = await productService.index();

    return response.json(classToClass(products));
  }

  async show(request: Request, response: Response) {
    const productService = new ProductService();

    const { product_id } = request.body;

    const products = await productService.show(product_id);

    return response.json(classToClass(products));
  }
}

export default new ProductController();
