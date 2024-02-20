type Server = {
  host: string;
  port: number;
  env: string;
};

type Postgres = {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  type: string;
};

type Redis = {
  host: string;
  port: number;
  password: string;
};

type AuthToken = {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
};

export type Config = {
  server: Server;
  postgres: Postgres;
  redis: Redis;
  authToken: AuthToken;
};
