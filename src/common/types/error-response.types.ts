import { ExceptionCode } from '../enums';

export type ErrorResponse<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  message: string;
  status: number;
  code: ExceptionCode;
};
