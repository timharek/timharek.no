export function getEntryDate(date: string) {
  return {
    day: date.split('-')[2],
    month: date.split('-')[1],
    year: date.split('-')[0],
    string: date,
  };
}
