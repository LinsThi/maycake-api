import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import ProductService from '@modules/product/services/ProductService';

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

    const { product_id } = request.query;

    const products = await productService.show({
      product_id: String(product_id),
    });

    return response.json(classToClass(products));
  }

  async alterVisible(request: Request, response: Response) {
    const productService = new ProductService();

    const { product_id, visible } = request.body;

    const products = await productService.alterVisible({
      product_id,
      visible,
    });

    return response.json(classToClass(products));
  }
}

export default new ProductController();
