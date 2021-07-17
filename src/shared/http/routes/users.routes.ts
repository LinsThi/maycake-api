import { Router } from 'express';
import multer from 'multer';
import uploadAvatar from '../config/uploadAvatar';

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

import UserController from '../../../controllers/UserController';
import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';
import ensureAdmin from '../../../middlewares/ensureAdmin';

const userRoutes = Router();
const uploadAvt = multer(uploadAvatar);

userRoutes.get('/list', ensureAuthenticated, ensureAdmin, UserController.index);

userRoutes.get('/me', ensureAuthenticated, UserController.show);

userRoutes.post('/', UserController.create);

userRoutes.put('/', ensureAuthenticated, UserController.update);

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
