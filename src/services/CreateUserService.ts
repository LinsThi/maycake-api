import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import UsersRepositories from '../repositories/UsersRepositories';

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
      throw new Error('E-mail already exists!');
    }

    const cpfAlreadyExists = await usersRepository.findOne({
      cpf
    });

    if (cpfAlreadyExists) {
      throw new Error('CPF already exists!');
    }

    const hashPassword = await hash(password, 8);

    const user = await usersRepository.create({
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