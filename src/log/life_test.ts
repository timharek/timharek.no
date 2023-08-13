// @deno-types="./mod.d.ts"

import { assertEquals } from "$std/testing/asserts.ts";
import { inject } from "../deps.ts";
import { LifeTesting, logLifeEvent } from "./life.ts";

Deno.test("Log a life event", async () => {
  inject({
    title: "Minor life change",
    description: "A description",
    date: "2012-12-26",
    category: "💪 Health",
  });

  const entry = await logLifeEvent();

  const expected: Log.Entry = {
    title: "Minor life change",
    type: "life",
    description: "A description",
    date: "2012-12-26",
    category: "💪 Health",
  };

  assertEquals(entry, expected);
});

Deno.test("Prompt custom prefix", async () => {
  inject({
    prefix: "🦕 Deno",
  });

  const result = await LifeTesting.getCategory("custom");

  assertEquals(result, "🦕 Deno");
});

Deno.test("Log a life event with custom prefix", async () => {
  inject({
    title: "Major life change",
    description: "A description",
    date: "2012-12-26",
    category: "custom",
    prefix: "🦕 Deno",
  });

  const entry = await logLifeEvent();

  const expected: Log.Entry = {
    title: "Major life change",
    type: "life",
    description: "A description",
    date: "2012-12-26",
    category: "🦕 Deno",
  };

  assertEquals(entry, expected);
});
