import { ExceptionCode } from '../enums';

import { BaseException } from './base.exception';

export class InternalException extends BaseException {
  constructor(public readonly message = 'Internal server error') {
    super(message, 500, ExceptionCode.Internal);
  }
}
