import { User } from '../../users/domain/user'

export type LoginResponseType = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}>;
