import { defineConfig } from 'drizzle-kit';

import { envConfig } from './env.config';

export default defineConfig({
  dialect: 'postgresql',
  schema: `${__dirname}/../**/*.schema.ts`,
  out: `${__dirname}/../database/migrations/`,
  migrations: {
    table: 'migration',
  },
  dbCredentials: {
    host: envConfig.DB_HOST,
    port: envConfig.DB_PORT,
    database: envConfig.DB_NAME,
    user: envConfig.DB_USER,
    password: envConfig.DB_PASSWORD,
  },
});
