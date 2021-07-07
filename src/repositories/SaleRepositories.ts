import { Repository, EntityRepository } from 'typeorm';
import Sale from '../entities/Sale';

@EntityRepository(Sale)
export default class SaleRepositories extends Repository<Sale> {}
