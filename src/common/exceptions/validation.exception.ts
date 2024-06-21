import { ErrorResponse } from '../types';

import { ExceptionCode } from '../enums';

import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(
    public readonly errors: Record<string, string[]>,
    public readonly message = 'Validation error',
  ) {
    super(message, 422, ExceptionCode.Validation);
  }

  public toResponse(): ErrorResponse<{ errors: Record<string, string[]> }> {
    return {
      message: this.message,
      status: this.status,
      code: this.code,
      errors: this.errors,
    };
  }
}
