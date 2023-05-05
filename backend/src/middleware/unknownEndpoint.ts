import { AppError, HttpCode } from '../exceptions/AppError';
import { NextFunction, Request, Response } from 'express';

const unknownEndpoint = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const unknownEndpoint = new AppError({
    description: 'Unknown endpoint',
    httpCode: HttpCode.NOT_FOUND,
  });
  next(unknownEndpoint);
};

export default unknownEndpoint;
