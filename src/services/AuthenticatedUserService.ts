import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';

import AppError from '../shared/errors/AppError';

interface IAuthenticatedRequest {
  email: string;
  password: string;
}

export default class ensureAuthenticatedService {
  async execute({ email, password }: IAuthenticatedRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError('E-mail or password incorrect!', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail or password incorrect!', 401);
    }

    const token = sign(
      {
        email: user.email,
      },
      process.env.APP_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return token;
  }
}
