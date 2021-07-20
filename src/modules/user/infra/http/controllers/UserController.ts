import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UserService from '@modules/user/services/UserService';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, cpf, admin } = request.body;

    const userService = new UserService();

    const user = await userService.create({
      name,
      email,
      password,
      cpf,
      admin,
    });

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response) {
    const { name, email, oldPassword, newPassword } = request.body;

    const userService = new UserService();

    const user = await userService.update({
      user_id: request.user_id,
      name,
      email,
      oldPassword,
      newPassword,
    });

    return response.json(classToClass(user));
  }

  async index(request: Request, response: Response) {
    const user_id = request.user_id;

    const userService = new UserService();

    let users = await userService.index({ user_except: user_id });

    return response.json(classToClass(users));
  }

  async show(request: Request, response: Response) {
    const user_id = request.user_id;

    const userService = new UserService();

    let users = await userService.show({ user_id });

    return response.json(classToClass(users));
  }
}

export default new UserController();
