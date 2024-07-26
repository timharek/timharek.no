import { Input, Number, prompt, Select } from "@cliffy/prompt";
import { Movie, TVShow } from "@timharek/tmdb";
import { Entry } from "../schemas.ts";
import { getCurrentDate, selectKeys } from "../utils.ts";
import { z } from "zod";

const movieOrTVSchema = z.object({
  title: z.string(),
  season: z.number().optional(),
  date: z.string().transform((value) =>
    new Date(value).toISOString().split("T")[0]
  ),
  rating: z.number().max(5).min(1),
  comment: z.string().optional(),
});

export async function logWatched(
  logType: Entry["type"],
): Promise<Entry> {
  if (logType !== "movie" && logType !== "tv") {
    throw new Error("Must be either movie or TV");
  }

  const currentDate = getCurrentDate();

  const movieOrTVPrompt = await prompt([
    {
      name: "title",
      message: "What did you watch?",
      type: Input,
    },
    {
      name: "season",
      message: "Which season?",
      type: Number,
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
      name: "comment",
      message: "Comment, what did you think?",
      type: Input,
    },
    {
      name: "rating",
      message: "How many stars? (1-5)",
      type: Number,
      min: 1,
      max: 5,
    },
  ]);

  const { title, season = 1, rating, date, comment } = movieOrTVSchema.parse(
    movieOrTVPrompt,
  );

  if (logType === "movie") {
    const searchResult = await Movie.search({ query: title });

    if (
      !searchResult || searchResult.results === undefined ||
      searchResult.results.length === 0
    ) {
      throw new Error("Couldn't find movie.");
    }
    const options = searchResult.results.filter((
      result,
    ): result is { title: string; id: number; release_date: string } =>
      result.title !== undefined && result.id !== undefined &&
      result.release_date !== undefined
    ).map((res) => ({
      name: `${res.title} (${new Date(res.release_date).getFullYear()})`,
      value: String(res.id),
    }));

    const { movieId } = await prompt([{
      name: "movieId",
      message: "Which movie?",
      type: Select,
      options,
      ...(searchResult.results.length > 10 && { search: true }),
      keys: selectKeys,
    }]);

    if (!movieId) {
      throw new Error("You didn't select any title");
    }

    const movie = await Movie.get(parseInt(movieId));

    if (!movie) {
      throw new Error(`Movie with id ${movieId} doesn't exist`);
    }

    return {
      type: "movie",
      title: movie.title,
      date: new Date(date),
      genres: movie.genres,
      release_year: movie.release_year,
      review: { rating, comment: comment ?? null },
      directors: movie.directors,
    };
  }

  const searchResult = await TVShow.search({ query: title });

  if (
    !searchResult || searchResult.results === undefined ||
    searchResult.results.length === 0
  ) {
    throw new Error("Couldn't find TV show.");
  }
  const options = searchResult.results.filter((
    result,
  ): result is { name: string; id: number; first_air_date: string } =>
    result.name !== undefined && result.id !== undefined &&
    result.first_air_date !== undefined
  ).map((res) => ({
    name: `${res.name} (${new Date(res.first_air_date).getFullYear()})`,
    value: String(res.id),
  }));

  const { seriesId } = await prompt([{
    name: "seriesId",
    message: "Which TV show?",
    type: Select,
    options,
    ...(searchResult.results.length > 10 && { search: true }),
    keys: selectKeys,
  }]);

  if (!seriesId) {
    throw new Error("You didn't select any title");
  }

  const tvShow = await TVShow.get(parseInt(seriesId));

  if (!tvShow) {
    throw new Error(`Movie with id ${seriesId} doesn't exist`);
  }

  return {
    type: "tv",
    title: tvShow.title,
    date: new Date(date),
    genres: tvShow.genres,
    release_year: tvShow.release_year,
    review: { rating, comment: comment ?? null },
    season: season,
    episode_count: null,
    directors: await TVShow.seasonDirectors(tvShow.id, season),
    creators: tvShow.creators,
  };
}
