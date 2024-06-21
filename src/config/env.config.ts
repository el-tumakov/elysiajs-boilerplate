import { Value } from '@sinclair/typebox/value';
import { Static, t } from 'elysia';

import { NodeEnv } from 'src/common/enums';

import { parseBool } from 'src/common/utils/parse-bool.util';

const EnvSchema = t.Object({
  NODE_ENV: t.Enum(NodeEnv),

  PORT: t.Number(),

  DB_HOST: t.String(),
  DB_PORT: t.Number(),
  DB_NAME: t.String(),
  DB_USER: t.String(),
  DB_PASSWORD: t.String(),
  DB_DEBUG: t.Optional(t.Boolean()),
});

type EnvConfig = Static<typeof EnvSchema>;

const validateEnvConfig = (
  schema: typeof EnvSchema,
  env: NodeJS.ProcessEnv,
): EnvConfig => {
  const parsedEnv = {
    NODE_ENV: env.NODE_ENV,

    PORT: parseInt(env.PORT || ''),

    DB_HOST: env.DB_HOST,
    DB_PORT: parseInt(env.DB_PORT || ''),
    DB_NAME: env.DB_NAME,
    DB_USER: env.DB_USER,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_DEBUG: parseBool(env.DB_DEBUG) || false,
  };

  const errors: string[] = [];

  for (const error of Value.Errors(schema, parsedEnv)) {
    errors.push(`    "${error.path.substring(1)}": ${error.message}`);
  }

  if (errors.length > 0) {
    console.error('Invalid environment variables:\n' + errors.join('\n'));
    process.exit(1);
  }

  return parsedEnv as EnvConfig;
};

const envConfig = validateEnvConfig(EnvSchema, process.env);

export { envConfig };
