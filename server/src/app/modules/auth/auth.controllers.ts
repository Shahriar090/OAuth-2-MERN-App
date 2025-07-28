import { Request, Response } from 'express';
import config from '../../config';
import { handleGitHubAuth, handleGoogleAuth } from './auth.services';

// google provder

export const handleGoogleRedirect = (req: Request, res: Response) => {
  const redirectUrl = `${config.google_base_url}?response_type=code&client_id=${config.google_client_id}&redirect_uri=${config.google_redirect_url}&scope=openid%20email%20profile`;

  res.redirect(redirectUrl);
};

export const handleGoogleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: 'Missing code' });
  }

  try {
    const token = await handleGoogleAuth(code);
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  } catch (error) {
    console.error('[OAuth Error]', error);
    res.status(500).json({ message: 'OAuth login failed' });
  }
};

// github provider
export const handleGitHubRedirect = (req: Request, res: Response) => {
  const redirectUrl = `${config.github_base_url}?client_id=${config.github_client_id}&redirect_uri=${config.github_redirect_url}&scope=user`;
  res.redirect(redirectUrl);
};

export const handleGitHubCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).json({ message: 'Missing Code' });
  }

  try {
    const token = await handleGitHubAuth(code);
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  } catch (error) {
    res.status(500).json({ message: 'GitHub Login Failed' });
  }
};
