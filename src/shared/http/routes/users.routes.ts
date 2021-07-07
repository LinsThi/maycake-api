import { Router } from 'express';
import multer from 'multer';
import uploadAvatar from '../config/uploadAvatar';

import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

import UserController from '../../../controllers/UserController';
import ensureAuthenticated from '../../../middlewares/ensureAuthenticated';

const userRoutes = Router();
const uploadAvt = multer(uploadAvatar);

userRoutes.post('/', UserController.create);

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
