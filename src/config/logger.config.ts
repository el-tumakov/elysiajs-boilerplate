import { LoggerOptions } from 'pino';

import { envConfig } from './env.config';

import { NodeEnv } from 'src/common/enums';

export const loggerConfig: LoggerOptions = {
  transport:
    envConfig.NODE_ENV === NodeEnv.Development
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        }
      : undefined,
};
