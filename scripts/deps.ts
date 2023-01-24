export {
  Input,
  List,
  Number,
  Select,
} from 'https://deno.land/x/cliffy@v0.25.6/prompt/mod.ts';
export { getMovie } from 'https://raw.githubusercontent.com/timharek/deno-omdb/main/omdb.ts';
export { Result as OMDB } from 'https://raw.githubusercontent.com/timharek/deno-omdb/main/mod.d.ts';

const commonPath = '../static/api';
export const logPath = {
  movie: `${commonPath}/movies.json`,
  tv: `${commonPath}/tv_shows.json`,
  game: `${commonPath}/games.json`,
  book: `${commonPath}/books.json`,
  travel: `${commonPath}/travel.json`,
  life: `${commonPath}/life.json`,
};