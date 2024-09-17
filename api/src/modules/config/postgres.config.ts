import { registerAs } from '@nestjs/config';

export type PostgresConfigOptions = {
  user: string;
  password: string;
  db: string;
  port: number;
  host: string;
};

export enum PostgresConfigEnum {
  HOST = 'postgres.host',
  DB = 'postgres.db',
  PORT = 'postgres.port',
  PASSWORD = 'postgres.password',
  USER = 'postgres.user',
}

export default registerAs(
  'postgres',
  (): PostgresConfigOptions => ({
    port: 5432,
    host: 'cat-pinterest-api-pg',
    db: 'support_lk_db',
    password: '1',
    user: 'postgres',
  }),
);
