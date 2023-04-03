import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { ValidationError } from 'sequelize';

import User from '../models/User.js';

export const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      id: v4(),
      name,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).send({
      id: newUser.id,
      email: newUser.email,
      token,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(403).send(err.errors[0].message); // Validation error
    } else {
      return res
        .status(500)
        .send('Could not create user, please try again.'); // Server error
    }
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ where: { email: email } });
    if (!identifiedUser) {
      return res
        .status(401)
        .send('User not found, please check your credentials.');
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(403).send(err.errors[0].message); // Validation error
    } else {
      return res
        .status(500)
        .send('Something went wrong, please try again.'); // Server error
    }
  }

  try {
    if (!identifiedUser.isValidPassword(password)) {
      return res
        .status(401)
        .send('User not found, please check your credentials.');
    }
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(403).send(err.errors[0].message); // Validation error
    } else {
      return res
        .status(500)
        .send('Something went wrong, please try again.'); // Server error
    }
  }

  try {
    const token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).send({
      id: identifiedUser.id,
      email: identifiedUser.email,
      token,
    });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(403).send(err.errors[0].message); // Validation error
    } else {
      return res
        .status(500)
        .send('Something went wrong, please try again.'); // Server error
    }
  }
};
