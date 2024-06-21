import { ExceptionCode } from '../enums';

import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(public readonly message = 'Not found') {
    super(message, 404, ExceptionCode.NotFound);
  }
}
