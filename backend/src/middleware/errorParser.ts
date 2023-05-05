import { ValidationError } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { AppError, HttpCode } from '../exceptions/AppError';

const errorParser = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ValidationError) {
    throw new AppError({
      description: err.errors[0].message,
      httpCode: HttpCode.BAD_REQUEST,
    });
  } else if (err instanceof TokenExpiredError) {
    throw new AppError({
      description: 'Token expired',
      httpCode: HttpCode.UNAUTHORIZED,
    });
  }

  // next();
  return res.status(500).json({ error: err.message });
};

export default errorParser;
