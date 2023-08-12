// @deno-types="./mod.d.ts"

import { assertEquals } from "$std/testing/asserts.ts";
import { inject } from "../deps.ts";
import { logTrip } from "./travel.ts";
import { getEntryDate } from "./util.ts";

Deno.test("Log a trip", async () => {
  inject({
    country: "Pangea",
    countryEmoji: "🌍",
    cities: "Africa, South America",
    departure: "0001-01-01",
    arrival: "2023-01-28",
    occasion: "pleasure",
    title: "Travel through time",
  });

  const entry = await logTrip("travel");

  const expected: Log.ITravelEntry = {
    title: "Travel through time",
    type: "travel",
    date: [getEntryDate("0001-01-01"), getEntryDate("2023-01-28")],
    details: {
      location: {
        cities: ["Africa", "South America"],
        country: {
          name: "Pangea",
          emoji: "🌍",
        },
      },
      occasion: "pleasure",
    },
  };

  assertEquals(entry, expected);
});
