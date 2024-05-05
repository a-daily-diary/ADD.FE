/**
 * 쿼리 파라미터를 받아 항상 문자열 배열로 반환합니다.
 */
export const getQueryParam = (
  param: string | string[] | undefined,
): string[] => {
  if (Array.isArray(param)) {
    return param;
  }
  if (param === undefined || param === '') {
    return [];
  }
  return [param];
};
