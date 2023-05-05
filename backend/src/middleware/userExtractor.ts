import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../utils/config';
import { AppError, HttpCode } from '../exceptions/AppError';

const userExtractor = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.token || !env.JWT_KEY) {
    throw new AppError({
      description: `${!req.token ? 'Token' : 'JWT key'} missing or invalid`,
      httpCode: HttpCode.UNAUTHORIZED,
    });
  }

  const decodedToken = jwt.verify(req.token, env.JWT_KEY);
  req.user = decodedToken;
  next();
};

export default userExtractor;
