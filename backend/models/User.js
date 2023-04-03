import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

import db from '../db/db.js';

class User extends Model {
  isValidPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: {
        arg: true,
        msg: 'User ID already exists.',
      },
      validate: {
        isUUID: {
          args: 4,
          msg: 'Invalid form for ID, expected UUID V4',
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'Could not create user, user already exists.',
      },
      validate: {
        len: {
          args: [3, 25],
          msg: 'Username must be between 3 and 25 characters long!',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        arg: true,
        msg: 'Could not create user, user already exists.',
      },
      validate: {
        isEmail: {
          msg: 'Invalid email format!',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 30],
          msg: 'Password must be between 5 and 30 characters long!',
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
    sequelize: db,
    modelName: 'User',
  }
);

export default User;
