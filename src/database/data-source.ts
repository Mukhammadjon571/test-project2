import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from '../config/index';

export const AppDataSource = new DataSource({
  type: configuration.postgres.type,
  host: configuration.postgres.host,
  port: configuration.postgres.port
    ? parseInt(configuration.postgres.port, 10)
    : 5432,
  username: configuration.postgres.user,
  password: configuration.postgres.password,
  database: configuration.postgres.database,
  synchronize: true,
  dropSchema: false,
  keepConnectionAlive: true,
  logging: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'subscriber',
  },
} as DataSourceOptions);
