import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import AuthenticatedUserService from '@modules/user/services/AuthenticatedUserService';

class AuthenticatedUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticatedUserService = new AuthenticatedUserService();

    const { user, token } = await authenticatedUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default new AuthenticatedUserController();
