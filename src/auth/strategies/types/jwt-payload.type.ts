import { Session } from '../../../sessions/domain/session';
import { User } from 'src/users/domain/user';

export type JwtPayloadType = Pick<User, 'id'> & {
  tokenId: Session['id'];
  iat: number;
  exp: number;
};
