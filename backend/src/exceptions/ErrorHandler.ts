import { Response } from 'express';
import { AppError, HttpCode } from './AppError';
import { exitHandler } from './ExitHandler';

class ErrorHandler {
  private isTrustedError(err: Error): boolean {
    if (err instanceof AppError) {
      return err.isOperational;
    }

    return false;
  }

  private handleTrustedError(err: AppError, res: Response): void {
    res.status(err.httpCode).json({ error: err.message });
  }

  // Handle untrusted errors by exiting
  private handleUntrustedError(
    err: Error | AppError,
    res?: Response
  ): void {
    if (res) {
      res
        .status(HttpCode.INTERNAL_SERVER_ERROR)
        .json({ error: 'Internal server error' });
    }

    console.error('Application encountered an untrusted error.');
    console.error(err);
    void exitHandler.handleExit(1);
  }

  // Check if error is trusted or not and process it accordingly
  public handleError(err: Error | AppError, res?: Response): void {
    if (this.isTrustedError(err) && res) {
      this.handleTrustedError(err as AppError, res);
    } else {
      this.handleUntrustedError(err, res);
    }
  }
}

export const errorHandler = new ErrorHandler();
