import { getMovie } from 'https://raw.githubusercontent.com/timharek/deno-omdb/main/omdb.ts';
import { Result as OMDB } from 'https://raw.githubusercontent.com/timharek/deno-omdb/main/mod.d.ts';
import {
  Input,
  Number,
  Select,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';

interface IWatchedEntryDate {
  day: string;
  month: string;
  year: string;
  string: string;
}

interface IWatchedEntry {
  title: string;
  type: 'movie' | 'tv';
  date: IWatchedEntryDate[];
  details: {
    release_year: number;
    my_rating: number;
    genres: string[];
    director?: string[];
    creator?: string[];
  };
}

const currentDate = new Date().toISOString().split('T')[0];

const title: string = await Input.prompt('What did you watch?');
const date: string = await Input.prompt(
  {
    message: 'When did you watch it? (YYYY-MM-DD)',
    suggestions: [currentDate],
  },
) ?? currentDate;
const type: 'movie' | 'tv' = await Select.prompt({
  message: 'Movie or TV Show?',
  options: [
    { name: 'Movie', value: 'movie' },
    { name: 'TV Show', value: 'tv' },
  ],
});
const rating: number = await Number.prompt({
  message: `How many stars for ${title}? (1-5)`,
  min: 1,
  max: 5,
});

const options = {
  apiKey: Deno.env.get('OMDB_API') ?? '',
  verbose: 3,
  title,
};

const entry: OMDB = await getMovie(options);

const watchedEntry: IWatchedEntry = {
  title: entry.title,
  type: type,
  date: [{
    day: date.split('-')[2],
    month: date.split('-')[1],
    year: date.split('-')[0],
    string: date,
  }],
  details: {
    release_year: entry.year,
    my_rating: rating,
    genres: entry.genre,
    ...(type === 'movie' && { director: entry.director }),
  },
};

if (type == 'movie') {
  const moviesJsonPath = '../static/api/movies.json';
  writeEntryToFile(moviesJsonPath, watchedEntry);
} else {
  const tvShowsJsonPath = '../static/api/tv_shows.json';
  writeEntryToFile(tvShowsJsonPath, watchedEntry);
}

async function writeEntryToFile(path: string, entry: IWatchedEntry) {
  const json: IWatchedEntry[] = JSON.parse(await Deno.readTextFile(path));
  const existingEntry = json.find((item) => item.title === entry.title);
  if (!existingEntry) {
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

console.log(watchedEntry);
