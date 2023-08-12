import { logMovieOrTv } from './watched.ts';
import { logGame } from './games.ts';
import { logBook } from './reading.ts';
import { logTrip } from './travel.ts';
import { logLifeEvent } from './life.ts';

/**
 * Log-module.
 *
 * Used for logging:
 * - Movies
 * - TV Shows
 * - Books
 * - Trips
 * - Life events
 */
export const log = {
  movieTv: logMovieOrTv,
  game: logGame,
  book: logBook,
  trip: logTrip,
  life: logLifeEvent,
};
