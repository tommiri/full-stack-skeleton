import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: 'mysql',
  logging: false,
});

db.authenticate()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Error connecting to database!\n', err);
  });

export default db;
