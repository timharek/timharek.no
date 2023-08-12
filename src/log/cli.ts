// @deno-types="./mod.d.ts"

import { logPath, Select } from "../deps.ts";
import { log } from "./index.ts";
import { selectKeys } from "./util.ts";

interface TypeSelector {
  [key: string]: (type: Log.Entry["type"]) => Promise<Log.Entry>;
}

const typeSelector: TypeSelector = {
  movie: log.movieTv,
  tv: log.movieTv,
  game: log.game,
  book: log.book,
  travel: log.trip,
  life: log.life,
};

const type: "movie" | "tv" | "game" | "book" | "life" = await Select.prompt({
  message: "What do you want to log?",
  options: [
    { name: "Movie", value: "movie" },
    { name: "TV Show", value: "tv" },
    { name: "Game", value: "game" },
    { name: "Book", value: "book" },
    { name: "Travel", value: "travel" },
    { name: "Life event", value: "life" },
  ],
  search: true,
  keys: selectKeys,
});

const newEntry = await typeSelector[type](type);

writeNewEntryToFile(logPath[type], newEntry);

async function writeNewEntryToFile(path: string, entry: Log.Entry) {
  const json: Log.Entry[] = JSON.parse(await Deno.readTextFile(path));
  json.push(entry);
  await Deno.writeTextFile(path, JSON.stringify(json, null, 2));
}
