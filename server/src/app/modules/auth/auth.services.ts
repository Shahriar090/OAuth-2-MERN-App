import axios from 'axios';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '../user/user.model';

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
