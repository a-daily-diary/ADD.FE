export const getLastYearDate = (date: Date): Date => {
  const lastYear = date.getFullYear() - 1;
  const monthInLastYear = date.getMonth();
  const dayInLastYear = date.getDate() + 1;

  return new Date(lastYear, monthInLastYear, dayInLastYear);
};

/**
 * 시작연도부터 현재까지의 연도 목록
 * @params  startYear 시작연도 string
 * @returns string[] | [시작연도, ..., 현재연도]
 */
export const getYearsFromStartYearToNow = (): string[] => {
  const startYear = 2023; // TODO: 활동 탭에서는 사용자의 시작 연도로 수정
  const nowYear = new Date().getFullYear();

  const years = Array.from({ length: nowYear - startYear + 1 }, (_, index) =>
    String(nowYear - index),
  );

  return years;
};
