export interface IUser {
  googleId?: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'local' | 'github';
  isVerified: boolean;
}
