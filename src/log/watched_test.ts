import { assertEquals } from "@std/assert";
import { inject } from "@cliffy/prompt";
import { Entry } from "../schemas.ts";
import { logWatched } from "./watched.ts";

Deno.test("Watched: Spider-Man (2002)", async () => {
  inject({
    title: "Spider-Man",
    date: "2024-07-12",
    rating: 5,
    comment: "The best!",
  });

  const entry = await logWatched("movie");

  const expected: Entry = {
    title: "Spider-Man",
    type: "movie",
    date: "2024-07-12",
    release_year: 2002,
    review: { rating: 5, comment: "The best!" },
    genres: ["Action", "Adventure", "Sci-Fi"],
    directors: ["Sam Raimi"],
  };

  assertEquals(entry, expected);
});

Deno.test("Watched: Spider-Man 3 (2007)", async () => {
  inject({
    title: "Spider-Man 3",
    date: "2024-07-12",
    rating: 4.5,
    comment: "Almost",
  });

  const entry = await logWatched("movie");

  const expected: Entry = {
    title: "Spider-Man 3",
    type: "movie",
    date: "2024-07-12",
    release_year: 2007,
    review: { rating: 4.5, comment: "Almost" },
    genres: ["Action", "Adventure", "Sci-Fi"],
    directors: ["Sam Raimi"],
  };

  assertEquals(entry, expected);
});

Deno.test("Watched: Mr Robot S1", async () => {
  inject({
    title: "Mr Robot",
    date: "2024-07-12",
    season: 1,
    rating: 5,
    comment: "Fantastic!",
  });

  const entry = await logWatched("tv");

  const expected: Entry = {
    title: "Mr. Robot",
    type: "tv",
    date: "2024-07-12",
    release_year: 2015,
    review: { rating: 5, comment: "Fantastic!" },
    genres: ["Crime", "Drama", "Thriller"],
    directors: ["N/A"],
    season: 1,
  };

  assertEquals(entry, expected);
});
