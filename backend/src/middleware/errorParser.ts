import { NextFunction, Request, Response } from 'express';
import { DatabaseError, ValidationError } from 'sequelize';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError, HttpCode } from '../exceptions/AppError';

const errorParser = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  let error = err;

  if (err instanceof ValidationError) {
    error = new AppError({
      name: 'ValidationError',
      description: err.errors[0].message,
      httpCode: HttpCode.BAD_REQUEST,
    });
  } else if (err instanceof DatabaseError) {
    error = new AppError({
      name: 'DatabaseError',
      description: 'Invalid query',
      httpCode: HttpCode.BAD_REQUEST,
    });
  } else if (err instanceof TokenExpiredError) {
    error = new AppError({
      name: 'TokenExpiredError',
      description: 'Token expired',
      httpCode: HttpCode.UNAUTHORIZED,
    });
  } else if (err instanceof JsonWebTokenError) {
    error = new AppError({
      name: 'JsonWebTokenError',
      description: 'Invalid signature',
      httpCode: HttpCode.UNAUTHORIZED,
    });
  }

  next(error);
};

export default errorParser;
