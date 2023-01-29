// @deno-types="../mod.d.ts"

export function getEntryDate(date: string): Log.IDate {
  return {
    day: date.split('-')[2],
    month: date.split('-')[1],
    year: date.split('-')[0],
    string: date,
  };
}

export function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0];
}

export const selectKeys = {
  next: ['down', 'tab'],
  previous: ['up', 'shift'],
};
