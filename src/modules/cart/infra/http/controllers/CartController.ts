import CartServices from '@modules/cart/services/CartServices';
import { Request, Response } from 'express';

class CartController {
  async create(request: Request, response: Response) {
    const cartServices = new CartServices();

    const user_id = request.user_id;
    const { cartProducts } = request.body;

    const cart = await cartServices.create({
      user_id,
      cartProducts,
    });

    return response.json(cart);
  }

  async show(request: Request, response: Response) {
    const cartServices = new CartServices();

    const user_id = request.user_id;

    const cart = await cartServices.show({ user_id });

    return response.json(cart);
  }

  async delete(request: Request, response: Response) {
    const cartServices = new CartServices();

    const { id } = request.body;

    await cartServices.delete({ id });

    return response.json({ message: 'Deleted with success' });
  }

  async update(request: Request, response: Response) {
    const cartServices = new CartServices();

    const { id, user_id, cartProduct } = request.body;

    const cart = await cartServices.update({ id, user_id, cartProduct });

    return response.json(cart);
  }

  async remove(request: Request, response: Response) {
    const cartServices = new CartServices();

    const { id, user_id, cartProduct } = request.body;

    const cart = await cartServices.remove({ id, user_id, cartProduct });

    return response.json(cart);
  }
}

export default new CartController();
