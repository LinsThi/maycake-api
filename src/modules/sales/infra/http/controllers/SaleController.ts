import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import SaleService from '@modules/sales/services/SaleService';

class SaleController {
  async create(request: Request, response: Response) {
    const { id_product_sold, address_id_user } = request.body;

    const saleService = new SaleService();

    const sale = await saleService.create({
      id_user_buying: request.user_id,
      id_product_sold,
      address_id_user,
    });

    return response.json(classToClass(sale));
  }

  async update(request: Request, response: Response) {
    const { id_sale, status } = request.body;

    const saleService = new SaleService();

    const sale = await saleService.update({
      id_sale: String(id_sale),
      status,
    });

    return response.json(classToClass(sale));
  }

  async index(request: Request, response: Response) {
    const saleService = new SaleService();

    const sales = await saleService.index();

    return response.json(classToClass(sales));
  }

  async show(request: Request, response: Response) {
    const saleService = new SaleService();

    const { sale_id } = request.query;

    const sale = await saleService.show({ sale_id: String(sale_id) });

    return response.json(classToClass(sale));
  }
}

export default new SaleController();
