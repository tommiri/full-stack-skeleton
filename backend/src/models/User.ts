import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

import sequelize from '../db/sequelize';

class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;

  isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      unique: {
        name: 'ID',
        msg: 'User ID already exists.',
      },
      validate: {
        isUUID: {
          args: 4,
          msg: 'Invalid form for ID, expected UUID V4',
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'Name',
        msg: 'Could not create user, username already in use.',
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
        name: 'Email',
        msg: 'Could not create user, email already in use.',
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
          msg: 'Password must be between 5 and 30 characters long!',
          args: [5, 30],
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.id = v4();
        user.password = await bcrypt.hash(user.password, 12);
      },
    },
    sequelize: sequelize,
    modelName: 'User',
  }
);

export default User;
