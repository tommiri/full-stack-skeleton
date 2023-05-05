import { NextFunction, Request, Response } from 'express';
import handleError from '../exceptions/handleError';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  handleError(err, res);
};

export default errorHandler;
