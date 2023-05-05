import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { AppError, HttpCode } from '../exceptions/AppError';

const errorParser = (
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    const validationError = new AppError({
      name: 'ValidationError',
      description: err.errors[0].message,
      httpCode: HttpCode.BAD_REQUEST,
    });
    next(validationError);
  } else if (err instanceof TokenExpiredError) {
    const tokenExpiredError = new AppError({
      name: 'TokenExpiredError',
      description: 'Token expired',
      httpCode: HttpCode.UNAUTHORIZED,
    });
    next(tokenExpiredError);
  } else if (err instanceof JsonWebTokenError) {
    const jsonWebTokenError = new AppError({
      name: 'JsonWebTokenError',
      description: 'Invalid signature',
      httpCode: HttpCode.UNAUTHORIZED,
    });
    next(jsonWebTokenError);
  } else {
    next(err);
  }
};

export default errorParser;
