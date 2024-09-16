import { registerAs } from '@nestjs/config';

export type AppConfigOptions = {
  port: number;
};

export enum AppConfigEnum {
  PORT = 'app.port',
}

export default registerAs(
  'app',
  (): AppConfigOptions => ({
    port: parseInt(process.env.PORT, 10),
  }),
);
