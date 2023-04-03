import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import db from './db/db.js';

const PORT = process.env.PORT || 5000;

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
