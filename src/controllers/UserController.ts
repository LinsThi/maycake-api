import { Request, Response } from 'express';

import CreateUserService from '../services/UserService';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, password, cpf, admin } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.create({
      name,
      email,
      password,
      cpf,
      admin,
    });

    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { name, email, oldPassword, newPassword } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.update({
      user_id: request.user_id,
      name,
      email,
      oldPassword,
      newPassword,
    });

    return response.json(user);
  }
}

export default new UserController();
