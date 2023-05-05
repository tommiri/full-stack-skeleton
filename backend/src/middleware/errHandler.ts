import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../exceptions/ErrorHandler';

const errHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  errorHandler.handleError(err, res);
};

export default errHandler;
