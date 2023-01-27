// @deno-types="./mod.d.ts"

import { getMovie, Input, Number, OMDB } from '../../deps.ts';
import { getEntryDate } from '../util.ts';

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
    ...(!title.startsWith('tt') && { title }),
    ...(title.startsWith('tt') && { id: title }),
  };

  const entry: OMDB = await getMovie(options);

  const watchedEntry: Log.IWatchedEntry = {
    title: entry.title,
    type: type,
    date: [getEntryDate(date)],
    details: {
      release_year: entry.year,
      my_rating: rating,
      genres: entry.genre,
      ...(type === 'movie' && { director: entry.director }),
    },
  };

  return watchedEntry;
}
