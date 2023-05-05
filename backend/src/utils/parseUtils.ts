import { CreationAttributes } from 'sequelize';

import { parseObject, parseString } from './typeParsers';
import { NewExample } from '../types/example/example';
import User from '../models/User';
import { AppError, HttpCode } from '../exceptions/AppError';

const validationError = new AppError({
  description: 'Incorrect data: a field is missing.',
  httpCode: HttpCode.BAD_REQUEST,
});

export const toNewExample = (param: unknown): NewExample => {
  const object = parseObject(param);

  if ('name' in object && 'description' in object) {
    const newEntry: NewExample = {
      name: parseString(object.name),
      description: parseString(object.description),
    };

    return newEntry;
  }

  throw validationError;
};

export type NewUser = CreationAttributes<User>;

export const toNewUser = (param: unknown): NewUser => {
  const object = parseObject(param);

  if ('username' in object && 'email' in object && 'password' in object) {
    const newUser: NewUser = {
      username: parseString(object.username),
      email: parseString(object.email),
      password: parseString(object.password),
    };

    return newUser;
  }

  throw validationError;
};

export type ExistingUser = Omit<NewUser, 'username'>;

export const toExistingUser = (param: unknown): ExistingUser => {
  const object = parseObject(param);

  if ('email' in object && 'password' in object) {
    const existingUser: ExistingUser = {
      email: parseString(object.email),
      password: parseString(object.password),
    };

    return existingUser;
  }

  throw validationError;
};
