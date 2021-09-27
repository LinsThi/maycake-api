import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import Cart from '../schemas/Cart';
import Products from '@modules/product/infra/typeorm/entities/Product';

interface CartProps {
  id: ObjectID;
  user_id: string;
  cartProducts: Products[];
}

export default class CartRepository {
  private ormRepository: MongoRepository<Cart>;

  constructor() {
    this.ormRepository = getMongoRepository(Cart, 'mongo');
  }

  public async create({
    user_id,
    cartProducts,
  }: Partial<CartProps>): Promise<Cart> {
    const cart = this.ormRepository.create({
      user_id,
      products: cartProducts,
    });

    await this.ormRepository.save(cart);

    return cart;
  }

  public async show({ user_id }: Partial<CartProps>): Promise<Cart> {
    let cartArray: Cart[];
    let cart: Cart;
    cartArray = await this.ormRepository
      .createCursor(
        this.ormRepository.findOne({
          user_id,
        }),
      )
      .toArray();

    cart = cartArray[0];

    return cart;
  }

  public async delete({ id }: Partial<CartProps>): Promise<void> {
    await this.ormRepository
      .createCursor(
        this.ormRepository.findOneAndDelete({
          id,
        }),
      )
      .toArray();
  }
}
