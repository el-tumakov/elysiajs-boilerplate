import { ErrorResponse } from '../types';

import { ExceptionCode } from '../enums/exception-code.enum';

export class BaseException extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
    public readonly code: ExceptionCode,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  public toResponse(): ErrorResponse {
    return {
      message: this.message,
      status: this.status,
      code: this.code,
    };
  }
}
