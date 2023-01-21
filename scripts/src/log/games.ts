// @deno-types="./mod.d.ts"

import {
  Input,
  Number,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';

export async function logGame(type: 'game') {
  const currentDate = new Date().toISOString().split('T')[0];

  const title: string = await Input.prompt('What did you play?');
  const platform: string = await Input.prompt(
    'Which platform did you play on?',
  );
  const releaseYear: number = await Number.prompt(
    'Which year did the game release?',
  );
  const date: string = await Input.prompt(
    {
      message: 'When did you play it? (YYYY-MM-DD)',
      suggestions: [currentDate],
    },
  ) ?? currentDate;
  const rating: number = await Number.prompt({
    message: `How many stars for ${title}? (1-5)`,
    min: 1,
    max: 5,
  });

  const gameEntry: Log.IGameEntry = {
    title: title,
    type: type,
    date: [{
      day: date.split('-')[2],
      month: date.split('-')[1],
      year: date.split('-')[0],
      string: date,
    }],
    details: {
      release_year: releaseYear,
      my_rating: rating,
      genres: [], // TODO: Might need to use an API to get neccessary data
      platform: [platform],
    },
  };

  return gameEntry;
}
