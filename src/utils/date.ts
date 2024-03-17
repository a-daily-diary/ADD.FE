export const getLastYearDate = (date: Date): Date => {
  const lastYear = date.getFullYear() - 1;
  const monthInLastYear = date.getMonth();
  const dayInLastYear = date.getDate() + 1;

  return new Date(lastYear, monthInLastYear, dayInLastYear);
};

/**
 * 활동 탭 캘린더를 위한 가입년도부터 현재년도까지 목록
 * @params  registerYear 사용자 가입년도 string
 * @returns string[] | [가입년도, ..., 현재년도]
 */
export const getYearsForActivitiesCalendar = (): string[] => {
  const registerYear = 2023; // TODO: 사용자 가입연도로 수정
  const nowYear = new Date().getFullYear();

  const years = Array.from({ length: nowYear - registerYear + 1 }, (_, index) =>
    String(nowYear - index),
  );

  return years;
};
