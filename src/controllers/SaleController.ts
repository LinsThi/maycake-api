import { Request, Response } from 'express';

import CreateSaleService from '../services/SaleService';

class SaleController {
  async create(request: Request, response: Response) {
    const { id_product_sold } = request.body;

    const createSaleService = new CreateSaleService();

    const sale = await createSaleService.create({
      id_user_buying: request.user_id,
      id_product_sold,
    });

    return response.json(sale);
  }
}

export default new SaleController();
