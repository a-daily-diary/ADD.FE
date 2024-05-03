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
