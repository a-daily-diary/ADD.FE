export interface ErrorResponse {
  error: string;
  message: ErrorMessage;
  statusCode: number;
  success: false;
}

export type ErrorMessage = string | string[] | undefined;

export interface SuccessResponse<T> {
  success: true;
  data: T;
}
