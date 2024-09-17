import { registerAs } from '@nestjs/config';

export type JWTConfigOptions = {
  secretSalt: string;
};

export enum JWTConfigEnum {
  SALT = 'jwt.secretSalt',
}

export default registerAs(
  'jwt',
  (): JWTConfigOptions => ({
    secretSalt: 'SECRET_SALT_SHOULD_KEEP_IN_DOTENV',
  }),
);
