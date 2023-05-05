import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/sequelize';

class Example extends Model {}

Example.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: 'Name', msg: 'Name must be unique!' },
      validate: {
        notNull: {
          msg: 'Name is required!',
        },
        notEmpty: {
          msg: 'Name must not be empty!',
        },
        len: {
          msg: 'Name must be atleast 3 characters long!',
          args: [3, 300],
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
          msg: 'Description must be atleast 3 characters long!',
          args: [3, 300],
        },
      },
    },
  },
  {
    sequelize: sequelize,
    modelName: 'Example',
  }
);

export default Example;
