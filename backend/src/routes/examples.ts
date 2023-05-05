/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
const router = Router();

import {
  getItems,
  getItemById,
  createItem,
  deleteItem,
} from '../controllers/examples';
import tokenExtractor from '../middleware/tokenExtractor';
import userExtractor from '../middleware/userExtractor';

router.get('/', getItems);
router.get('/:id', getItemById);

router.use(tokenExtractor, userExtractor);

router.post('/', createItem);
router.delete('/:id', deleteItem);

export default router;
