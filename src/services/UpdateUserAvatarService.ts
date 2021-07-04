import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepositories';

import AppError from '../shared/errors/AppError';
import uploadAvatar from '../shared/http/config/uploadAvatar';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ user_id, avatarFileName }: IRequest): Promise<User>{
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('Only authenticated users can change avatar');
    }

    if(user.avatar !== 'defaultIMG.jpg'){
      const userAvatarFilePath = path.join(uploadAvatar.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}