import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { container } from 'tsyringe';

import { DatabaseConfig, envConfig } from 'src/config';

const queryClient = postgres(DatabaseConfig);

export const db = drizzle(queryClient, {
  logger: envConfig.DB_DEBUG,
});

export const DB_TOKEN = Symbol('DB_TOKEN');

container.registerInstance(DB_TOKEN, db);

export type Database = typeof db;
