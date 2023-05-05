import { Request, Response } from 'express';

import Example from '../models/Example';
import { toNewExample } from '../utils/parseUtils';
import { AppError } from '../exceptions/AppError';
import { HttpCode } from '../exceptions/AppError';

export const getItems = async (req: Request, res: Response) => {
  const items = await Example.findAll({
    where: req.query, // Allows searching with query params
  });

  // If items.length >= 0, there are no entries
  if (!items.length) {
    throw new AppError({
      description: 'No items found!',
      httpCode: HttpCode.NOT_FOUND,
    });
  }

  res.json(items);
};

export const getItemById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const item = await Example.findOne({ where: { id } });

  if (!item) {
    throw new AppError({
      description: 'Item not found!',
      httpCode: HttpCode.NOT_FOUND,
    });
  }

  res.json(item);
};

export const createItem = async (req: Request, res: Response) => {
  const parsedItem = toNewExample(req.body);
  const newItem = await Example.create(parsedItem);

  res.status(201).json(newItem);
};

export const deleteItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const item = await Example.findOne({ where: { id } });
  if (!item) {
    throw new AppError({
      description: 'Item not found!',
      httpCode: HttpCode.NOT_FOUND,
    });
  }

  await Example.destroy({ where: { id } });
  res.status(200).json({ deleted: item });
};
