import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../models/User';
import env from '../utils/config';
import { toNewUser, toExistingUser } from '../utils/parseUtils';
import { AppError, HttpCode } from '../exceptions/AppError';

const signToken = (id: string, email: string) => {
  return jwt.sign(
    {
      id,
      email,
    },
    env.JWT_KEY,
    { expiresIn: '1h' }
  );
};

export const signUpUser = async (req: Request, res: Response) => {
  const parsedUser = toNewUser(req.body);

  const newUser = await User.create(parsedUser);

  const token = signToken(newUser.id, newUser.email);

  res.status(201).send({
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    token,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = toExistingUser(req.body);

  const authError = new AppError({
    description: 'Invalid username or password, please check your credentials.',
    httpCode: HttpCode.UNAUTHORIZED,
  });

  const identifiedUser = await User.findOne({
    where: { email },
    rejectOnEmpty: authError,
  });

  const isValidPassword = await identifiedUser.isValidPassword(password);

  if (!isValidPassword) {
    throw authError;
  }

  const token = signToken(identifiedUser.id, identifiedUser.email);

  res.status(201).send({
    id: identifiedUser.id,
    email: identifiedUser.email,
    token,
  });
};
