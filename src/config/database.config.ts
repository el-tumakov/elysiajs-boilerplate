import { Options, PostgresType } from 'postgres';

import { envConfig } from './env.config';

export const DatabaseConfig: Options<Record<string, PostgresType>> = {
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  database: envConfig.DB_NAME,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASSWORD,
  debug: envConfig.DB_DEBUG,
};
