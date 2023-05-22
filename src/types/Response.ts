export interface ErrorResponse {
  error: string;
  message: ErrorMessage;
  statusCode: number;
  success: boolean;
}

export type ErrorMessage = string | string[] | undefined;

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
}
