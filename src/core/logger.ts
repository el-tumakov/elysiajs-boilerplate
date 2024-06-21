import { pino } from 'pino';
import { container } from 'tsyringe';

import { loggerConfig } from 'src/config';

export const LOGGER_TOKEN = Symbol('LOGGER_TOKEN');
export const logger = pino(loggerConfig);

container.registerInstance(LOGGER_TOKEN, logger);

export type Logger = typeof logger;
