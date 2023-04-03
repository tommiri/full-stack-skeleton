import express from 'express';
const router = express.Router();

import verifyToken from '../middleware/verifyToken.js';

import {
  getItems,
  getItemById,
  createItem,
  deleteItem,
} from '../controllers/examples.js';

router.get('/', getItems);
router.get('/:id', getItemById);

router.use(verifyToken);

router.post('/', createItem);
router.delete('/:id', deleteItem);

export default router;
