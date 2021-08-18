import { Request, Response } from 'express';

import AddressService from '@modules/address/services/AddressService';

class AddressController {
  async create(request: Request, response: Response) {
    const user_id = request.user_id;
    const { road, number, complement, cep } = request.body;

    const addressService = new AddressService();

    const address = await addressService.create({
      user_id,
      road,
      number,
      complement,
      cep,
    });

    return response.json(address);
  }

  async show(request: Request, response: Response) {
    const id = request.params;

    const addressService = new AddressService();

    const address = await addressService.show(id);

    return response.json(address);
  }

  async list(request: Request, response: Response) {
    const user_id = request.user_id;

    const addressService = new AddressService();

    const address = await addressService.list({ user_id });

    return response.json(address);
  }
}

export default new AddressController();
