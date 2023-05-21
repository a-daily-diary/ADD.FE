export interface ErrorResponse {
  error: string;
  message: string[];
  statusCode: number;
  success: boolean;
}

export interface SuccessResponse<T> {
  success: boolean;
  data: T;
}
