import { DataTypes, Model } from 'sequelize';
import db from '../db/db.js';

class Example extends Model {}

Example.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Item already exists!',
      },
      validate: {
        notNull: {
          msg: 'Name is required!',
        },
        notEmpty: {
          msg: 'Name must not be empty!',
        },
        len: {
          args: [3],
          msg: 'Name must be atleast 3 characters long!',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description is required!',
        },
        notEmpty: {
          msg: 'Description must not be empty!',
        },
        len: {
          args: [3],
          msg: 'Description must be atleast 3 characters long!',
        },
      },
    },
  },
  {
    sequelize: db,
    modelName: 'Example',
  }
);

export default Example;
