import 'reflect-metadata';
import 'dotenv/config';

import { errors } from 'celebrate';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import userRoutes from '@modules/user/infra/http/routes/users.routes';
import authenticatedRoutes from '@modules/user/infra/http/routes/authenticated.routes';
import productRoutes from '@modules/product/infra/http/routes/products.routes';
import saleRoutes from '@modules/sales/infra/http/routes/sales.routes';

import '../typeorm';
import AppError from '../errors/AppError';
import uploadAvatar from './config/uploadAvatar';
import uploadPhoto from './config/uploadPhoto';

const app = express();
app.use(express.json());
app.use('/filesAvatar', express.static(uploadAvatar.directory));
app.use('/filesProduct', express.static(uploadPhoto.directory));

app.use('/users', userRoutes);
app.use('/sessions', authenticatedRoutes);
app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Back ta on 🤠');
});
