// @deno-types="../../mod.d.ts"

import { getMovie, Input, Number, OMDB, prompt } from '../../deps.ts';
import { getCurrentDate, getEntryDate } from '../util.ts';

export async function logMovieOrTv(type: 'movie' | 'tv') {
  const currentDate = getCurrentDate();

  const { title, date, rating } = await prompt([
    {
      name: 'title',
      message: 'What did you watch?',
      type: Input,
    },
    {
      name: 'date',
      message: 'When did you watch it? (YYYY-MM-DD)',
      suggestions: [currentDate],
      type: Input,
    },
    {
      name: 'rating',
      message: 'How many stars for ${title}? (1-5)',
      type: Number,
      min: 1,
      max: 5,
    },
  ]);

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
