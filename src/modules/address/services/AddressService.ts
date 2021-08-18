import { getCustomRepository } from 'typeorm';

import AddressRepository from '../infra/typeorm/repositories/AddressRepository';
import AppError from '@shared/errors/AppError';
import Address from '../infra/typeorm/entities/Address';

interface AddressRequest {
  id?: string;
  user_id: string;
  road: string;
  number: number;
  complement: string;
  cep: string;
}

export default class AddressService {
  async create({ user_id, road, number, complement, cep }: AddressRequest) {
    const addressRepository = getCustomRepository(AddressRepository);

    const addressAlreadyExits = await addressRepository.find({
      where: {
        road,
        number,
        complement,
        cep,
      },
    });

    if (addressAlreadyExits.length > 0) {
      throw new AppError('Address already registered');
    }

    const address = addressRepository.create({
      user_id,
      road,
      number,
      complement,
      cep,
    });

    await addressRepository.save(address);

    return address;
  }

  async show({ id }: Partial<AddressRequest>) {
    const addressRepository = getCustomRepository(AddressRepository);

    const address = addressRepository.findOne(id);

    return address;
  }

  async list({ user_id }: Partial<AddressRequest>) {
    let address: Address[];

    const addressRepository = getCustomRepository(AddressRepository);

    address = await addressRepository.find({ user_id });

    return address;
  }
}
