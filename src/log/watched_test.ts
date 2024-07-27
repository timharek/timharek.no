import { assertArrayIncludes, assertEquals, assertExists } from "@std/assert";
import { inject } from "@cliffy/prompt";
import { logWatched } from "./watched.ts";

Deno.test("Watched: Spider-Man (2002)", async () => {
  inject({
    title: "Spider-Man",
    date: "2024-07-12",
    rating: 5,
    comment: "The best!",
  });

  const entry = await logWatched("movie", true);

  assertEquals(entry.type, "movie", "type");
  assertEquals(entry.title, "Spider-Man", "title");
  if (entry.type !== "movie") throw new Error("asd");
  assertEquals(entry.review.rating, 5, "rating");
  assertExists(entry.directors, "exists directors");
  assertArrayIncludes(entry.directors, ["Sam Raimi"], "directors");
  assertExists(entry.genres, "exists genres");
  assertArrayIncludes(entry.genres, ["Action"], "genres");
});

Deno.test("Watched: Spider-Man 3 (2007)", async () => {
  inject({
    title: "Spider-Man 3",
    date: "2024-07-12",
    rating: 4,
    comment: "Almost",
  });

  const entry = await logWatched("movie", true);

  assertEquals(entry.type, "movie", "type");
  assertEquals(entry.title, "Spider-Man 3", "title");
  if (entry.type !== "movie") throw new Error("asd");
  assertEquals(entry.review.rating, 4, "rating");
  assertExists(entry.directors, "exists directors");
  assertArrayIncludes(entry.directors, ["Sam Raimi"], "directors");
  assertExists(entry.genres, "exists genres");
  assertArrayIncludes(entry.genres, ["Adventure"], "genres");
});

Deno.test("Watched: Mr Robot S1", async () => {
  inject({
    title: "Mr Robot",
    date: "2024-07-12",
    season: 1,
    rating: 5,
    comment: "Fantastic!",
  });

  const entry = await logWatched("tv", true);

  assertEquals(entry.type, "tv", "type");
  assertEquals(entry.title, "Mr. Robot", "title");
  if (entry.type !== "tv") throw new Error("asd");
  assertEquals(entry.review.rating, 5, "rating");
  assertExists(entry.directors, "exists directors");
  assertArrayIncludes(entry.directors, ["Sam Esmail"], "directors");
  assertExists(entry.genres, "exists genres");
  assertArrayIncludes(entry.genres, ["Crime"], "genres");
});
