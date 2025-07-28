import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  // port
  port: process.env.PORT,
  // db
  db_url: process.env.DB_URL,
  // google provider credentials
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_url: process.env.GOOGLE_REDIRECT_URI,
  google_base_url: process.env.GOOGLE_BASE_URL,
  google_token_url: process.env.GOOGLE_TOKEN_URL,
  google_user_info_url: process.env.GOOGLE_USER_INFO_URL,
  // jwt
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRY,
  // github provider credentials
  github_client_id: process.env.GITHUB_CLIENT_ID,
  github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  github_redirect_url: process.env.GITHUB_REDIRECT_URL,
  github_base_url: process.env.GITHUB_BASE_URL,
  github_token_url: process.env.GITHUB_TOKEN_URL,
  github_user_info_url: process.env.GITHUB_USER_INFO_URL,
};
