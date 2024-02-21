import { User } from '../../users/domain/user'

export type RegisterResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;
