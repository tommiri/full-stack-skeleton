import { env } from './utils/config';

import app from './app';
import sequelize from './db/sequelize';

const PORT = env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
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
