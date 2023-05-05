import { Sequelize } from 'sequelize';
import env from '../utils/config';

const sequelize = new Sequelize({
  host: env.MYSQL_HOST,
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.error('Connection to database failed: ', err);
  });

export default sequelize;
