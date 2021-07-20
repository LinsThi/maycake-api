import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayLoad {
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.APP_TOKEN_SECRET) as IPayLoad;

    request.user_id = sub;

    return next();
  } catch {
    return response.status(401).end();
  }
}
