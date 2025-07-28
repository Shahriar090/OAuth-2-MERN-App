import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';

// google provider
const googleTokenURL = config.google_token_url as string;
const googleUserInfoURL = config.google_user_info_url as string;

export const getGoogleOAuthTokens = async (code: string) => {
  const res = await axios.post(
    googleTokenURL,
    {
      code,
      client_id: config.google_client_id,
      client_secret: config.google_client_secret,
      redirect_uri: config.google_redirect_url,
      grant_type: 'authorization_code',
    },
    { headers: { 'Content-Type': 'application/json' } },
  );

  return res.data;
};

export const getGoogleUserInfo = async (access_token: string) => {
  const res = await axios.get(googleUserInfoURL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.data;
};

export const handleGoogleAuth = async (code: string): Promise<string> => {
  const { access_token } = await getGoogleOAuthTokens(code);
  const userInfo = await getGoogleUserInfo(access_token);

  let user = await User.findOne({ email: userInfo.email });

  if (!user) {
    user = await User.create({
      email: userInfo.email,
      name: userInfo.name,
      googleId: userInfo.sub,
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    config.jwt_secret as string,
    { expiresIn: '1d' },
  );

  return token;
};

// github provider
export const handleGitHubAuth = async (code: string): Promise<string> => {
  const tokenResponse = await axios.post(
    config.github_token_url as string,
    {
      client_id: config.github_client_id,
      client_secret: config.github_client_secret,
      code,
      redirect_uri: config.github_redirect_url,
    },
    {
      headers: { Accept: 'application/json' },
    },
  );

  const access_token = tokenResponse.data.access_token;

  // get user info

  const { data: userInfo } = await axios.get(
    config.github_user_info_url as string,
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );

  let email = userInfo.email;
  if (!email) {
    const emailsResponse = await axios.get(
      'https://api.github.com/user/emails',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    // Find the primary verified email
    const primaryEmailObj = emailsResponse.data.find(
      (emailObj: any) => emailObj.primary && emailObj.verified,
    );

    email = primaryEmailObj?.email || null;
  }

  // check and create user
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: userInfo.name,
      email,
      githubId: userInfo.id,
      avatar: userInfo.avatar_url,
    });
  }

  // generate jwt
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    config.jwt_secret as string,
    { expiresIn: '1d' },
  );

  return token;
};
