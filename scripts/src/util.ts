// @deno-types="../mod.d.ts"

export function getEntryDate(date: string): Log.IDate {
  return {
    day: date.split('-')[2],
    month: date.split('-')[1],
    year: date.split('-')[0],
    string: date,
  };
}
