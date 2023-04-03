import { ValidationError } from 'sequelize';

import Example from '../models/Example.js';

export const getItems = async (req, res) => {
  try {
    const items = await Example.findAll({
      where: req.query, // Allows searching with query params
    });

    // If items.length > 0, there are entries
    if (items.length) {
      res.status(200).send(items);
    } else {
      res.status(404).send('No items found!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getItemById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const item = await Example.findOne({ where: { id: id } });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).send('Item not found!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createItem = async (req, res) => {
  try {
    const item = await Example.create(req.body);
    res.status(201).send(item);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(403).send(err.errors[0].message); // Validation error, print custom error message
    } else {
      res.status(500).send(err.message); // Server error
    }
  }
};

export const deleteItem = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const item = await Example.findOne({ where: { id: id } });
    if (!item) {
      return res.status(404).send('Not Found');
    }

    await Example.destroy({ where: { id: id } });
    res.status(200).send({ deleted: item });
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
};
