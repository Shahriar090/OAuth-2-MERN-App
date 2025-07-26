import express from 'express';
import { handleGoogleCallback, handleGoogleRedirect } from './auth.controllers';
const router = express.Router();

router.get('/google', handleGoogleRedirect);
router.get('/google/callback', handleGoogleCallback);

export const authRouter = router;
