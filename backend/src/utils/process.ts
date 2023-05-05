import { exitHandler } from '../exceptions/ExitHandler';
import { errorHandler } from '../exceptions/ErrorHandler';

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught exception: ${error.message}`);
  errorHandler.handleError(error);
});

process.on('SIGTERM', () => {
  console.log(
    `Process ${process.pid} received SIGTERM: Exiting with code 0`
  );
  void exitHandler.handleExit(0);
});

process.on('SIGINT', () => {
  console.log(
    `Process ${process.pid} received SIGINT: Exiting with code 0`
  );
  void exitHandler.handleExit(0);
});
