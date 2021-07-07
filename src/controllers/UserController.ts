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
}

export default new UserController();
