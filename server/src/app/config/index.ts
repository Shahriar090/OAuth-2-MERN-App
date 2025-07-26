import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_redirect_url: process.env.GOOGLE_REDIRECT_URI,
  google_base_url: process.env.GOOGLE_BASE_URL,
  jwt_secret: process.env.JWT_SECRET,
  jwt_expiry: process.env.JWT_EXPIRY,
  google_token_url: process.env.GOOGLE_TOKEN_URL,
  google_user_info_url: process.env.GOOGLE_USER_INFO_URL,
};
