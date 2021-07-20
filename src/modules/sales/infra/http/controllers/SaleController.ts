import { Request, Response } from 'express';

import CreateSaleService from '@modules/sales/services/SaleService';

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

  async update(request: Request, response: Response) {
    const { id_sale, status } = request.body;

    const createSaleService = new CreateSaleService();

    const sale = await createSaleService.update({
      id_sale,
      status,
    });

    return response.json(sale);
  }
}

export default new SaleController();
