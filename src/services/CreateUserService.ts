import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import UsersRepositories from '../repositories/UsersRepositories';

import AppError from '../shared/errors/AppError';
interface IUsersRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  admin?: boolean;
  avatar?: string;
}

export default class CreateUserService {
  async execute({ name, email, password, cpf, admin = false, avatar }: IUsersRequest){
    const usersRepository = getCustomRepository(UsersRepositories);
    
    const emailAlreadyExists = await usersRepository.findOne({
      email
    });

    if(emailAlreadyExists) {
      throw new AppError('E-mail already exists!');
    }

    const cpfAlreadyExists = await usersRepository.findOne({
      cpf
    });

    if (cpfAlreadyExists) {
      throw new AppError('CPF already exists!');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
      cpf,
      admin,
      avatar
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}