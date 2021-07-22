import { Router } from 'express';

import { celebrate, Joi, Segments } from 'celebrate';

import AuthenticatedUserController from '@modules/user/infra/http/controllers/AuthenticatedUserController';

const authenticatedRoutes = Router();

authenticatedRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  AuthenticatedUserController.handle,
);

export default authenticatedRoutes;
