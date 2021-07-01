import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';

interface IAuthenticatedRequest {
  email: string;
  password: string;
}

export default class ensureAuthenticatedService {
  async execute({ email, password }: IAuthenticatedRequest){
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({
      email
    });

    if(!user) {
      throw new Error('E-mail or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);
    
    if(!passwordMatch) {
      throw new Error('E-mail or password incorrect!');
    }

    const token = sign(
      {
      email: user.email
      }, 
      '0812ced69e931b0d5cdc518349aeabee',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  } 
}