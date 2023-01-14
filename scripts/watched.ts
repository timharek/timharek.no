import { getMovie } from 'https://raw.githubusercontent.com/timharek/deno-omdb/main/omdb.ts';
import { Result as OMDB } from 'https://raw.githubusercontent.com/timharek/deno-omdb/main/mod.d.ts';
import {
  Input,
  Number,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';

export async function logMovieOrTv(type: 'movie' | 'tv') {
  const currentDate = new Date().toISOString().split('T')[0];

  const title: string = await Input.prompt('What did you watch?');
  const date: string = await Input.prompt(
    {
      message: 'When did you watch it? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
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

  return watchedEntry;
}
