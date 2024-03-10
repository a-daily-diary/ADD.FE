export const getLastYearDate = (date: Date): Date => {
  const lastYear = date.getFullYear() - 1;
  const monthInLastYear = date.getMonth();
  const dayInLastYear = date.getDate() + 1;

  return new Date(lastYear, monthInLastYear, dayInLastYear);
};
