import { assertEquals } from "$std/testing/asserts.ts";
import { inject } from "../deps.ts";
import { logGame } from "./games.ts";

Deno.test("Log a game", async () => {
  inject({
    title: "A video game",
    platform: "PC",
    releaseYear: 2012,
    date: "2012-12-26",
    rating: "5",
  });

  const entry = await logGame();

  const expected: Log.Entry = {
    title: "A video game",
    type: "game",
    date: "2012-12-26",
    release_year: 2012,
    review: { rating: 5 },
    genres: [],
    platform: "PC",
  };

  assertEquals(entry, expected);
});
