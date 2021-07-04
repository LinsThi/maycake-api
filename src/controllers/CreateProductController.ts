import { Request, Response } from 'express';

import CreateProductService from "../services/CreateProductService";

class CreateProductController {
  async handle(request: Request, response: Response) {

    const { name, description, value, photo } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      value,
      photo
    });

    return response.json(product);
  }
}

export default new CreateProductController;