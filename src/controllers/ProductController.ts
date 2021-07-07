import { Request, Response } from 'express';

import CreateProductService from '../services/ProductService';

class ProductController {
  async create(request: Request, response: Response) {
    const { name, description, value, photo } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.create({
      name,
      description,
      value,
      photo,
    });

    return response.json(product);
  }
}

export default new ProductController();
