// @deno-types="./mod.d.ts"

import { getMovie, Input, Number, OMDB, prompt } from "../deps.ts";
import { getCurrentDate, getEntryDate } from "./util.ts";

export async function logMovieOrTv(logType: "movie" | "tv") {
  const currentDate = getCurrentDate();

  const { title, date, rating, season } = await prompt([
    {
      name: "title",
      message: "What did you watch?",
      type: Input,
    },
    {
      name: "season",
      message: "Which season?",
      type: Input,
      before: async (_, next) => {
        if (logType === "tv") {
          await next();
        } else {
          await next("date");
        }
      },
    },
    {
      name: "date",
      message: "When did you watch it? (YYYY-MM-DD)",
      suggestions: [currentDate],
      type: Input,
    },
    {
      name: "rating",
      message: "How many stars for ${title}? (1-5)",
      type: Number,
      min: 1,
      max: 5,
    },
  ]);

  const options = {
    api: Deno.env.get("OMDB_API") ?? "",
    verbose: 3,
    titleOrId: title,
  };

  const entry: OMDB = await getMovie(options);

  const watchedEntry: Log.IWatchedEntry = {
    title: `${entry.title}${season ? ` S${season}` : ""}`,
    type: logType,
    date: [getEntryDate(date)],
    details: {
      release_year: entry.year,
      my_rating: rating,
      genres: entry.genre,
      ...(logType === "movie" && { director: entry.director }),
    },
  };

  return watchedEntry;
}
