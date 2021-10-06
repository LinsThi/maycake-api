import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import Cart from '../schemas/Cart';
import Products from '@modules/product/infra/typeorm/entities/Product';

interface CartProps {
  id: ObjectID;
  user_id: string;
  cartProducts: Products[];
  cartProduct: Products;
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
      .createCursor(this.ormRepository.find())
      .toArray();

    cartArray = cartArray.filter(cart => cart.user_id === user_id);

    cart = cartArray[0];

    return cart;
  }

  public async delete({ id }: Partial<CartProps>): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update({
    id,
    user_id,
    cartProduct,
  }: Partial<CartProps>): Promise<Cart> {
    let cartArray: Cart[];
    let cart: Cart;

    cartArray = await this.ormRepository
      .createCursor(this.ormRepository.find())
      .toArray();

    cartArray = cartArray.filter(cart => cart.user_id === user_id);

    cart = cartArray[0];

    cart.products.push(cartProduct);

    this.ormRepository.createCursor(this.ormRepository.update(id, cart));

    return cart;
  }

  public async remove({
    id,
    user_id,
    cartProduct,
  }: Partial<CartProps>): Promise<Cart> {
    let cartArray: Cart[];
    let cart: Cart;

    cartArray = await this.ormRepository
      .createCursor(this.ormRepository.find())
      .toArray();

    cartArray = cartArray.filter(cart => cart.user_id === user_id);

    cart = cartArray[0];

    cart.products = cart.products.slice(
      0,
      cart.products.findIndex(product => product.id === cartProduct.id),
    );

    this.ormRepository.createCursor(this.ormRepository.update(id, cart));

    return cart;
  }
}
