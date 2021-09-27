import Products from '@modules/product/infra/typeorm/entities/Product';
import { ObjectID } from 'typeorm';
import CartRepository from '../infra/typeorm/repositories/CartRepository';

interface CartRequest {
  id: ObjectID;
  user_id: string;
  cartProducts: Products[];
}

export default class CartServices {
  async create({ user_id, cartProducts }: Partial<CartRequest>) {
    const cartRepository = new CartRepository();

    const cart = await cartRepository.create({
      user_id,
      cartProducts,
    });

    return cart;
  }

  async show({ user_id }: Partial<CartRequest>) {
    const cartRepository = new CartRepository();

    const cart = await cartRepository.show({
      user_id,
    });

    return cart;
  }

  async delete({ id }: Partial<CartRequest>) {
    const cartRepository = new CartRepository();

    await cartRepository.delete({
      id,
    });
  }
}
