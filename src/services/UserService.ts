import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { cpf as cpF } from 'cpf-cnpj-validator';

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

export default class UserService {
  async create({
    name,
    email,
    password,
    cpf,
    admin = false,
    avatar = 'defaultIMG.jpg',
  }: IUsersRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const emailAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (emailAlreadyExists) {
      throw new AppError('E-mail already exists!');
    }

    const cpfValid = cpF.isValid(cpf);

    if (!cpfValid) {
      throw new AppError('CPF invalid!');
    }

    if (cpf.length === 11) {
      cpf = cpF.format(cpf);
    }

    const cpfAlreadyExists = await usersRepository.findOne({
      cpf,
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
      avatar,
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
