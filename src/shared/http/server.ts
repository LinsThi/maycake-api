import 'reflect-metadata';
import express from 'express';

import userRoutes from './routes/users.routes';
import authenticatedRoutes from './routes/authenticated.routes';

import '../typeorm';

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/sessions", authenticatedRoutes);

app.listen(3333, () => {
  console.log('Back ta on 🤠');
});