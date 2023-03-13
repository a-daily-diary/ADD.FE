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
    .slice(0, -1);

  return convertDate;
  // 예: 2020.08.29
};

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
