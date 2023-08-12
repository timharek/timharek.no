// @deno-types="./mod.d.ts"

import { assertEquals } from "$std/testing/asserts.ts";
import { inject } from "../deps.ts";
import { LifeTesting, logLifeEvent } from "./life.ts";
import { getEntryDate } from "./util.ts";

Deno.test("Log a life event", async () => {
  inject({
    title: "Minor life change",
    description: "A description",
    date: "2012-12-26",
    customPrefix: "💪 Health",
  });

  const entry = await logLifeEvent("life");

  const expected: Log.ILifeEventEntry = {
    title: "Minor life change",
    type: "life",
    description: "A description",
    date: [getEntryDate("2012-12-26")],
    details: {
      custom_prefix: "💪 Health",
    },
  };

  assertEquals(entry, expected);
});

Deno.test("Prompt custom prefix", async () => {
  inject({
    prefix: "🦕 Deno",
  });

  const result = await LifeTesting.getCustomPrefix("custom");

  assertEquals(result, "🦕 Deno");
});

Deno.test("Log a life event with custom prefix", async () => {
  inject({
    title: "Major life change",
    description: "A description",
    date: "2012-12-26",
    customPrefix: "custom",
    prefix: "🦕 Deno",
  });

  const entry = await logLifeEvent("life");

  const expected: Log.ILifeEventEntry = {
    title: "Major life change",
    type: "life",
    description: "A description",
    date: [getEntryDate("2012-12-26")],
    details: {
      custom_prefix: "🦕 Deno",
    },
  };

  assertEquals(entry, expected);
});
