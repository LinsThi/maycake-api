import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Sale from '../infra/typeorm/entities/Sale';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepositories';
import SaleRepository from '../infra/typeorm/repositories/SaleRepositories';

import AppError from '@shared/errors/AppError';
import uploadConfirmPay from '@shared/http/config/uploadConfirmPay';

interface IRequest {
  user_id: string;
  sale_id: string;
  imgConfirmPay: string;
}

export default class UpdateConfirmPaySaleService {
  async execute({ user_id, sale_id, imgConfirmPay }: IRequest): Promise<Sale> {
    const usersRepository = getCustomRepository(UsersRepository);
    const salesRepository = getCustomRepository(SaleRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar');
    }

    const sale = await salesRepository.findOne(sale_id);

    if (!sale) {
      throw new AppError('ERROR: Sale not found in system');
    }

    sale.confirmPay = imgConfirmPay;

    await salesRepository.save(sale);

    return sale;
  }
}
