/**
 * YYYY.MM.DD 날짜 포맷터
 * @param dateString Date string
 * @returns null | YYYY.MM.DD
 */
export const dateFormat = (dateString: string): string | null => {
  // invalid date 에러 방어 코드
  if (isNaN(Date.parse(dateString))) return null;

  const date = new Date(dateString);
  const convertDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .slice(0, -1)
    .replace(/ /g, '');

  return convertDate;
};

// TODO: constant/common으로 이동
const DAY_OF_WEEK = {
  long: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};

/**
 * YYYY.MM.DD 요일 날짜 포맷터
 * @param dateString Date string
 * @returns null | YYYY.MM.DD Day of week
 */
export const dateWithDayFormat = (dateString: string): string | null => {
  // invalid date 에러 방어 코드
  if (isNaN(Date.parse(dateString))) return null;

  const date = new Date(dateString);
  const convertDate = dateFormat(dateString) as string;
  const dayOfWeek = DAY_OF_WEEK.long[date.getDay()];

  return `${convertDate} ${dayOfWeek}`;
};

/**
 * 시간 포맷터
 * @param dateString Date string
 * @returns null | 방금 전 | N분 전 | N시간 전
 */
export const timeFormat = (dateString: string): string | null => {
  // invalid date 에러 방어 코드
  if (isNaN(Date.parse(dateString))) return null;

  const nowDate = new Date();
  const date = new Date(dateString);
  const minTimeGap = Math.floor(nowDate.getTime() - date.getTime()) / 1000 / 60;

  if (minTimeGap < 0) return null;
  if (minTimeGap < 1) return '방금 전';
  if (minTimeGap < 60) return `${Math.floor(minTimeGap)}분 전`;
  if (minTimeGap / 24 < 24) return `${Math.floor(minTimeGap / 24)}시간 전`;

  return null;
};
