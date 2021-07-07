import { getCustomRepository } from 'typeorm';

import ProductRepositories from '../repositories/ProductRepositories';
import SaleRepositories from '../repositories/SaleRepositories';
import UsersRepository from '../repositories/UsersRepositories';

import AppError from '../shared/errors/AppError';

interface IRequest {
  id_user_buying: string;
  id_product_sold: string;
}

export default class SaleService {
  async create({ id_user_buying, id_product_sold }: IRequest) {
    const saleRepository = getCustomRepository(SaleRepositories);
    const userRepository = getCustomRepository(UsersRepository);
    const productRepository = getCustomRepository(ProductRepositories);

    const user = await userRepository.findOne(id_user_buying);

    if (!user) {
      throw new AppError('User must be logged in');
    }

    const product = await productRepository.findOne(id_product_sold);

    if (!product) {
      throw new AppError('Product not found');
    }

    const sale = saleRepository.create({
      id_user_buying,
      id_product_sold,
      value: product.value,
      status: 'Aguardando pagamento',
    });

    await saleRepository.save(sale);

    return sale;
  }
}
