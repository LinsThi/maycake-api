import 'reflect-metadata';
import express from 'express';

import userRoutes from './routes/users.routes';

import '../typeorm';

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3333, () => {
  console.log('Back ta on 🤠');
});