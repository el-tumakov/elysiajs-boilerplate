import Elysia, { NotFoundError, ValidationError } from 'elysia';
import postgres from 'postgres';

import { logger } from 'src/core/logger';

import {
  BaseException,
  InternalException,
  NotFoundException,
  ValidationException,
} from '../exceptions';

export const onErrorInterceptor = new Elysia().onError(
  { as: 'global' },
  (context) => {
    const { set, error, code } = context;

    set.headers = { 'Content-Type': 'application/json' };

    if (error instanceof BaseException) {
      set.status = error.status;

      return error.toResponse();
    }

    if (error instanceof NotFoundError || code === 'NOT_FOUND') {
      const newError = new NotFoundException();

      return newError.toResponse();
    }

    if (error instanceof ValidationError) {
      const validationErrors: Record<string, string[]> = {};

      for (const item of error.all as { path: string; message: string }[]) {
        const field = item.path.substring(1);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }

        validationErrors[field].push(item.message);
      }

      const newError = new ValidationException(validationErrors);

      return newError.toResponse();
    }

    const logData = {
      headers: context.request.headers,
      method: context.request.method,
      path: context.path,
      params: context.params,
      query: context.query,
      body: context.body,
    };

    if (error instanceof postgres.PostgresError) {
      logger.error(logData, error.message);
    } else {
      logger.error({ ...logData, err: error }, 'Unexpected error');
    }

    const newError = new InternalException();
    set.status = newError.status;

    return newError.toResponse();
  },
);
