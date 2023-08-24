import { getMovie, Input, Number, prompt } from "../deps.ts";
import type { OMDB } from "../deps.ts";
import { getCurrentDate } from "../utils.ts";

export async function logMovieOrTv(
  logType: Log.Entry["type"],
): Promise<Log.Entry> {
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
    titleOrId: title as string,
  };

  const entry: OMDB.Response = await getMovie(options);

  if (logType === "movie") {
    return {
      type: "movie",
      title: entry.title,
      date: new Date(date as string).toISOString(),
      genres: entry.genre,
      release_year: entry.year,
      review: { rating },
      ...(entry.director && { director: entry.director }),
    };
  }

  return {
    type: "tv",
    title: entry.title,
    date: new Date(date as string),
    genres: entry.genre,
    release_year: entry.year,
    review: { rating },
    season,
    ...(entry.director && { director: entry.director }),
    ...(entry.creator && { creator: entry.creator }),
  };
}
