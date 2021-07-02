import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response){
    const { name, email, password, cpf, admin } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      admin,
    });

    return response.json(user);
  };
}

export default new CreateUserController();