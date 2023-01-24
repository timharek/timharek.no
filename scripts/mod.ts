// @deno-types="./mod.d.ts"

import { Select } from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';
import { log } from './src/log/index.ts';

const typeSelector = {
  movie: log.movieTv,
  tv: log.movieTv,
  game: log.game,
  book: log.book,
  travel: log.trip,
  life: log.life,
};

const commonPath = '../static/api';
const entryPath = {
  movie: `${commonPath}/movies.json`,
  tv: `${commonPath}/tv_shows.json`,
  game: `${commonPath}/games.json`,
  book: `${commonPath}/books.json`,
  travel: `${commonPath}/travel.json`,
  life: `${commonPath}/life.json`,
};

const type: 'movie' | 'tv' | 'game' | 'book' | 'life' = await Select.prompt({
  message: 'What do you want to log?',
  options: [
    { name: 'Movie', value: 'movie' },
    { name: 'TV Show', value: 'tv' },
    { name: 'Game', value: 'game' },
    { name: 'Book', value: 'book' },
    { name: 'Travel', value: 'travel' },
    { name: 'Life event', value: 'life' },
  ],
  search: true,
});

const entry = await typeSelector[type](type);
type entryType = typeof entry;

writeEntryToFile<entryType>(entryPath[type], entry);

async function writeEntryToFile<T extends Log.IEntry>(path: string, entry: T) {
  const json: T[] = JSON.parse(await Deno.readTextFile(path));
  const existingEntry = json.find((item) => item.title === entry.title);
  if (!existingEntry || entry.type == 'travel') {
    json.push(entry);
  }
  if (existingEntry) {
    const updatedEntry = {
      ...existingEntry,
      date: [...existingEntry.date, entry.date[0]],
    };
    const index = json.findIndex((item) => item.title === existingEntry.title);

    json[index] = updatedEntry;
  }
  await Deno.writeTextFile(path, JSON.stringify(json, null, 2));
}