import express from 'express';
import {
  handleGitHubCallback,
  handleGitHubRedirect,
  handleGoogleCallback,
  handleGoogleRedirect,
} from './auth.controllers';
const router = express.Router();

// google provider
router.get('/google', handleGoogleRedirect);
router.get('/google/callback', handleGoogleCallback);

// github provider
router.get('/github', handleGitHubRedirect);
router.get('/github/callback', handleGitHubCallback);

export const authRouter = router;
