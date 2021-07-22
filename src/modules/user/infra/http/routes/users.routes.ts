import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadAvatar from '@shared/http/config/uploadAvatar';

import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';

import UserController from '@modules/user/infra/http/controllers/UserController';
import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@modules/user/infra/http/middlewares/ensureAdmin';

const userRoutes = Router();
const uploadAvt = multer(uploadAvatar);

userRoutes.get('/list', ensureAuthenticated, ensureAdmin, UserController.index);

userRoutes.get('/me', ensureAuthenticated, UserController.show);

userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required,
    },
  }),
  UserController.create,
);

userRoutes.put(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().required(),
    },
  }),
  UserController.update,
);

userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvt.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user_id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default userRoutes;
