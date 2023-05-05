import handleExit from '../exceptions/handleExit';
import handleError from '../exceptions/handleError';

process.on('uncaughtException', (error: Error) => {
  console.log(`Uncaught exception: ${error.message}`);
  handleError(error);
});

process.on('SIGTERM', () => {
  console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  handleExit(0);
});

process.on('SIGINT', () => {
  console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  handleExit(0);
});
