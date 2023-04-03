import { Router } from 'express';
const router = Router();

import { loginUser, signUpUser } from '../controllers/users.js';

router.post('/signup', signUpUser);
router.post('/login', loginUser);

export default router;
