/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
const router = Router();

import { loginUser, signUpUser } from '../controllers/users';

router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router;
