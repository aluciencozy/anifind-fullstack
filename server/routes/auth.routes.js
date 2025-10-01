import { signUp, signIn, signOut, getProfile } from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middleware.js';

import express from 'express';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', authMiddleware, signOut);
authRouter.get('/me', authMiddleware, getProfile);

export default authRouter;
