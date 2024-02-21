import { Session } from '../../../sessions/domain/session';

export type JwtRefreshPayloadType = {
  sessionId: Session['id'];
  iat: number;
  exp: number;
};
