import { logPath, Select } from "../deps.ts";
import { Entry, Log } from "../schemas.ts";
import { selectKeys } from "../utils.ts";
import { log } from "./index.ts";
import { z } from "zod";

interface TypeSelector {
  [key: string]: (type: Entry["type"]) => Promise<Entry>;
}

const typeSelector: TypeSelector = {
  movie: log.movieTv,
  tv: log.movieTv,
  game: log.game,
  book: log.book,
  travel: log.trip,
};

const type = await Select.prompt<Entry["type"]>({
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
}) as Entry["type"];

const newEntry = await typeSelector[type](type);

writeNewEntryToFile(logPath[type], newEntry);

async function writeNewEntryToFile(path: string, entry: Entry) {
  const json = JSON.parse(await Deno.readTextFile(path));
  const allEntries = z.array(Log.Entry).parse(json);
  allEntries.push(entry);
  console.log(entry);
  await Deno.writeTextFile(path, JSON.stringify(allEntries, null, 2));
}
