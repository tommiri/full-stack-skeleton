import { Response } from 'express';
import { AppError, HttpCode } from './AppError';
import handleExit from './handleExit';

const isTrustedError = (err: Error) => {
  if (err instanceof AppError) {
    return err.isOperational;
  }

  return false;
};

const handleTrustedError = (err: AppError, res: Response) => {
  res.status(err.httpCode).json({ error: err.message });
};

// Handle untrusted errors by exiting
const handleUntrustedError = (err: Error | AppError, res?: Response) => {
  if (res) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }

  console.error('Application encountered an untrusted error.');
  console.error(err);
  handleExit(1);
};

// Check if error is trusted or not and process it accordingly
const handleError = (err: Error | AppError, res?: Response) => {
  if (isTrustedError(err) && res) {
    handleTrustedError(err as AppError, res);
  } else {
    handleUntrustedError(err, res);
  }
};

export default handleError;
