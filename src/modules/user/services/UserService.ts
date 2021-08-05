import { getCustomRepository, Not, MongoRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { cpf as cpF } from 'cpf-cnpj-validator';

import User from '../infra/typeorm/entities/User';
import UsersRepositories from '../infra/typeorm/repositories/UsersRepositories';

import NotificationsRepository from '@modules/notification/infra/typeorm/repositories/NotificationsRepository';

import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IUsersRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  admin?: boolean;
  avatar?: string;
}

interface IUsersUpdateRequest {
  user_id: string;
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
}

interface IUsersFind {
  user_id?: string;
  user_except?: string;
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
    const notificationsRepository = new NotificationsRepository();

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

    await notificationsRepository.create({
      recipient_id: user.id,
      title: 'Seja bem-vindo ao Maycake =)',
      content: 'Obrigado por se cadastrar na aplicação!',
    });

    return user;
  }

  async update({
    user_id,
    name,
    email,
    oldPassword,
    newPassword,
  }: IUsersUpdateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await usersRepository.findOne({ email });

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;

    if (oldPassword && !newPassword) {
      throw new AppError(
        'You need to inform the new password to set a new password',
      );
    }

    if (oldPassword && newPassword) {
      const oldPasswordHash = await compare(oldPassword, user.password);

      if (!oldPasswordHash) {
        throw new AppError('Old password does not match!');
      }
      user.password = await hash(newPassword, 8);
    }

    await usersRepository.save(user);

    return classToClass(user);
  }

  async index({ user_except }: IUsersFind): Promise<User[]> {
    let users: User[];

    const usersRepository = getCustomRepository(UsersRepositories);

    users = await usersRepository.find({
      where: {
        id: Not(user_except),
      },
    });

    return users;
  }

  async show({ user_id }: IUsersFind): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne(user_id);

    delete user.password;

    return user;
  }
}
