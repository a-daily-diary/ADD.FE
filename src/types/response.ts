export type ErrorMessage = string | string[] | undefined;

export interface ErrorResponse {
  error: string;
  message: ErrorMessage;
  statusCode: number;
  success: false;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

/* Common */

export interface OnlyMessageResponse {
  message: string;
}
