// @deno-types="../../mod.d.ts"

import { Input, Number, prompt } from '../../deps.ts';
import { getEntryDate } from '../util.ts';

export async function logGame(type: 'game') {
  const currentDate = new Date().toISOString().split('T')[0];

  const result = await prompt([{
    name: 'title',
    message: 'What did you play?',
    type: Input,
  }, {
    name: 'platform',
    message: 'Which platform did you play it on?',
    type: Input,
  }, {
    name: 'releaseYear',
    message: 'Which year did the game release?',
    type: Number,
  }, {
    name: 'date',
    message: 'When did you play it? (YYYY-MM-DD)',
    type: Input,
    suggestions: [currentDate],
  }, {
    name: 'rating',
    message: 'How many stars? (1-5)',
    type: Number,
    min: 1,
    max: 5,
  }]);

  const { title, date, releaseYear, rating, platform } = result;

  const gameEntry: Log.IGameEntry = {
    title: title,
    type: type,
    date: [getEntryDate(date)],
    details: {
      release_year: releaseYear,
      my_rating: rating,
      genres: [], // TODO: Might need to use an API to get neccessary data
      platform: [platform],
    },
  };

  return gameEntry;
}
