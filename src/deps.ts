export {
  Confirm,
  inject,
  Input,
  List,
  Number,
  prompt,
  Select,
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
export { getMovie } from "https://deno.land/x/omdb@v2.0.0/mod.ts";

const commonPath = "./static/api";

interface LogPath {
  [key: string]: string;
}
export const logPath: LogPath = {
  movie: `${commonPath}/movies.json`,
  tv: `${commonPath}/tv_shows.json`,
  game: `${commonPath}/games.json`,
  book: `${commonPath}/books.json`,
  travel: `${commonPath}/travel.json`,
  life: `${commonPath}/life.json`,
};
