/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { loginUser, signUpUser } from '../controllers/users';

const router = Router();

router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router;
