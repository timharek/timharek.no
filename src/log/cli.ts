import { Entry, Log } from "../schemas.ts";
import { Select } from "@cliffy/prompt";
import { logGame } from "./games.ts";
import { logRead } from "./reading.ts";
import { logTravel } from "./travel.ts";
import { logWatched } from "./watched.ts";
import { selectKeys } from "../utils.ts";
import { z } from "zod";

type TypeSelector = Record<
  Entry["type"],
  (type: Entry["type"]) => Promise<Entry>
>;

const typeSelector: TypeSelector = {
  movie: logWatched,
  tv: logWatched,
  game: logGame,
  book: logRead,
  travel: logTravel,
};

const commonPath = "./static/api";
const logPath: Record<Entry["type"], string> = {
  movie: `${commonPath}/movies.json`,
  tv: `${commonPath}/tv_shows.json`,
  game: `${commonPath}/games.json`,
  book: `${commonPath}/books.json`,
  travel: `${commonPath}/travel.json`,
};

async function writeNewEntryToFile(path: string, entry: Entry) {
  const json = JSON.parse(await Deno.readTextFile(path));
  const allEntries = z.array(Log.Entry).parse(json);
  allEntries.push(entry);
  console.log(entry);
  await Deno.writeTextFile(path, JSON.stringify(allEntries, null, 2));
}

if (import.meta.main) {
  const type = await Select.prompt<Entry["type"]>({
    message: "What do you want to log?",
    options: [
      { name: "Movie", value: "movie" },
      { name: "TV Show", value: "tv" },
      { name: "Game", value: "game" },
      { name: "Book", value: "book" },
      { name: "Travel", value: "travel" },
    ],
    search: true,
    keys: selectKeys,
  }) as Entry["type"];

  const newEntry = await typeSelector[type](type);
  writeNewEntryToFile(logPath[type], newEntry);
}
