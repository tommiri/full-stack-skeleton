import { NextFunction, Request, Response } from 'express';
import { AppError, HttpCode } from '../exceptions/AppError';

const unknownEndpoint = (_req: Request, _res: Response, next: NextFunction) => {
  const unknownEndpointError = new AppError({
    description: 'Unknown endpoint',
    httpCode: HttpCode.NOT_FOUND,
  });
  next(unknownEndpointError);
};

export default unknownEndpoint;
