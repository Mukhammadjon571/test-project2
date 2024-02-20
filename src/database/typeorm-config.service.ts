import 'reflect-metadata';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import configuration from '../config/index';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configuration.postgres.host,
      port: +configuration.postgres.port,
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
    } as TypeOrmModuleOptions;
  }
}
