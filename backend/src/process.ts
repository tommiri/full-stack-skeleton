import { errorHandler } from './exceptions/ErrorHandler';

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught exception: ${error.message}`);
  errorHandler.handleError(error);
});
