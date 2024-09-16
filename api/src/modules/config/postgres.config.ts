import { registerAs } from '@nestjs/config';

export type PostgresConfigOptions = {
  user: string;
  password: string;
  db: string;
  port: number;
  host: string;
};

export enum PostgresConfigEnum {
  PORT = 'postgres.port',
  DB = 'postgres.db',
  PASSWORD = 'postgres.password',
  USER = 'postgres.user',
  HOST = 'postgres.host',
}

export default registerAs(
  'postgres',
  (): PostgresConfigOptions => ({
    port: parseInt(process.env.POSTGRES_PORT, 10),
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
  }),
);
