// @deno-types="./mod.d.ts"

import { assertEquals } from "$std/testing/asserts.ts";
import {
  migrateBook,
  migrateGame,
  migrateMovie,
  migrateTVShow,
} from "./migrate.ts";

const movies = JSON.parse(
  await Deno.readTextFile(
    new URL("../../static/api/movies.json", import.meta.url),
  ),
) as Log.IWatchedEntry[];

const tvShows = JSON.parse(
  await Deno.readTextFile(
    new URL("../../static/api/tv_shows.json", import.meta.url),
  ),
) as Log.IWatchedEntry[];

const books = JSON.parse(
  await Deno.readTextFile(
    new URL("../../static/api/books.json", import.meta.url),
  ),
) as Log.IBookEntry[];

const games = JSON.parse(
  await Deno.readTextFile(
    new URL("../../static/api/games.json", import.meta.url),
  ),
) as Log.IGameEntry[];

Deno.test("Migrate movie", () => {
  const oldMovie = movies[0];
  const migratedMovie = migrateMovie(oldMovie);

  assertEquals(migratedMovie, {
    title: "Batman v Superman: Dawn of Justice",
    type: "movie",
    date: new Date("2016-03-22T00:00:00.000Z"),
    review: {
      rating: 2,
    },
    release_year: 2016,
    director: ["Zack Snyder"],
    genres: ["Action", "Adventure", "Sci-Fi", "Comicbook"],
  });
});

Deno.test("Migrate TV Show", () => {
  const oldTVShow = tvShows[0];
  const migratedTVShow = migrateTVShow(oldTVShow);

  assertEquals(migratedTVShow, {
    title: "Daredevil",
    type: "tv",
    date: new Date("2015-04-11T00:00:00.000Z"),
    review: {
      rating: 5,
    },
    release_year: 2015,
    creator: ["Drew Goddard"],
    season: 1,
    genres: [
      "Action",
      "Crime",
      "Drama",
      "Fantasy",
      "Sci-Fi",
      "Thriller",
    ],
  });
});

Deno.test("Migrate book", () => {
  const oldBook = books[0];
  const migratedBook = migrateBook(oldBook);

  assertEquals(migratedBook, {
    title: "Essentialism: The Disciplined Pursuit of Less",
    type: "book",
    date: new Date("2018-12-14T00:00:00.000Z"),
    review: {
      rating: 4,
    },
    publish_year: 2014,
    genres: [
      "Nonfiction",
      "Self Help",
      "Psychology",
      "Productivity",
      "Business",
    ],
  });
});

Deno.test("Migrate game", () => {
  const oldGame = games[0];
  const migratedGame = migrateGame(oldGame);

  assertEquals(migratedGame, {
    title: "The Elder Scrolls V: Skyrim",
    type: "game",
    date: new Date("2012-02-03T00:00:00.000Z"),
    review: {
      rating: 5,
    },
    platform: "PC",
    release_year: 2011,
    genres: [
      "Action",
      "Adventure",
      "Fantasy",
    ],
  });
});
