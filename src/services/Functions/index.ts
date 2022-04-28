export const getHoursBetweenDates = (date1: Date, date2: Date) => {
  return Math.abs(date1.valueOf() - date2.valueOf()) / 36e5;
};
