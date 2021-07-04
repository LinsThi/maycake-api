import { EntityRepository, Repository } from 'typeorm';

import Product from '../entities/Product';

@EntityRepository(Product)
export default class ProductRepositories extends Repository<Product> {}