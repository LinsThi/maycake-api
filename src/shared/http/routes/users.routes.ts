import { Router } from 'express';

import CreateUserController from '../../../controllers/CreateUserController';

const userRoutes = Router();

userRoutes.post("/", CreateUserController.handle);

export default userRoutes;