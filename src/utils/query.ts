import type { ParsedUrlQuery } from 'querystring';

/**
 * 쿼리 파라미터를 받아 항상 문자열 배열로 반환합니다.
 */
export const getQueryParams = (
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

/**
 * @param pathname Pages Router의 pathname
 * @param query  Pages Router의 query
 * @param regex  pathname에서 치환하고 싶은 값의 정규식 (default. 대소문자 영어, 특수문자(_ -))
 * @returns pathname에서 query 값에 속해있는 값을 치환한 문자열을 반환합니다.
 */
export const convertPathname = (
  pathname: string,
  query: ParsedUrlQuery,
  regex = /\[([a-zA-Z0-9_-]+)\]/g,
) => {
  const result = pathname.replace(
    regex,
    (match, extract: string) => getQueryParams(query[extract])[0] ?? match,
  );

  return result;
};
