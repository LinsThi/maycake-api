import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response){
    console.log(request.body);

    const { name, email, password, cpf, admin, avatar } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      admin,
      avatar
    });

    return response.json(user);
  };
}

export default new CreateUserController();