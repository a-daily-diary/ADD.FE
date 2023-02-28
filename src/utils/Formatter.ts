export const dateFormat = (date: Date): string => {
  const convertDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(date)
    .replace(/ /g, '');

  return convertDate.slice(0, -1);
  // 예: 2020.08.29
};

export const timeFormat = (date: Date): string | null => {
  const nowDate = new Date();
  const createdDate = new Date(date);
  const minTimeGap =
    Math.floor(nowDate.getTime() - createdDate.getTime()) / 1000 / 60;

  if (minTimeGap < 1) {
    return '방금 전';
  }
  if (minTimeGap < 60) {
    return `${Math.floor(minTimeGap)}분 전`;
  }
  if (minTimeGap / 24 < 24) {
    return `${Math.floor(minTimeGap / 24)}시간 전`;
  }
  return null;
};
