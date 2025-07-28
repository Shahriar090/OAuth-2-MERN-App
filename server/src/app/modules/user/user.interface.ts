export interface IUser {
  googleId?: string;
  githubId?: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'local' | 'github';
  isVerified: boolean;
}
