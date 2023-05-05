import { env } from './utils/config';
import http from 'http';
import { createHttpTerminator } from 'http-terminator';

import app from './app';
import sequelize from './db/sequelize';

const PORT = env.PORT || 5000;
export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({ server });

sequelize
  .sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}!`);
    });
  })
  .catch((err: unknown) => {
    let errorMsg = 'Something went wrong.';
    if (err instanceof Error) {
      errorMsg = 'Error: ' + err.message;
    }
    console.error(errorMsg);
  });
