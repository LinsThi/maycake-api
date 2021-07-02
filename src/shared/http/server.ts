import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import userRoutes from './routes/users.routes';
import authenticatedRoutes from './routes/authenticated.routes';

import '../typeorm';
import AppError from '../errors/AppError';

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/sessions", authenticatedRoutes);

app.use((err: Error, request: Request, response: Response, next : NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Back ta on 🤠');
});