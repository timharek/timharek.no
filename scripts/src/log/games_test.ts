// @deno-types="../../mod.d.ts"

import { assertEquals } from 'std/testing/asserts.ts';
import { inject } from '../../deps.ts';
import { logGame } from './games.ts';
import { getEntryDate } from '../util.ts';

Deno.test('Log a game', async () => {
  inject({
    title: 'A video game',
    platform: 'PC',
    releaseYear: 2012,
    date: '2012-12-26',
    rating: '5',
  });

  const entry = await logGame('game');

  const expected: Log.IGameEntry = {
    title: 'A video game',
    type: 'game',
    date: [getEntryDate('2012-12-26')],
    details: {
      release_year: 2012,
      my_rating: 5,
      genres: [],
      platform: ['PC'],
    },
  };

  assertEquals(entry, expected);
});
