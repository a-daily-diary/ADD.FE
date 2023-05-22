import type { ErrorMessage } from 'types/Response';

// NOTE: error message가 배열인 경우 메시지 배열의 첫 번째를 반환, 문자열일 경우 메시지 자체를 반환
export const errorResponseMessage = (errorResponse: ErrorMessage) => {
  if (typeof errorResponse === undefined) return;
  return Array.isArray(errorResponse) ? errorResponse[0] : errorResponse;
};
