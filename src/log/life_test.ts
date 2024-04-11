import { assertEquals } from "$std/assert/mod.ts";
import { inject } from "cliffy";
import { Entry } from "../schemas.ts";
import { LifeTesting, logLifeEvent } from "./life.ts";

Deno.test("Log a life event", async () => {
  inject({
    title: "Minor life change",
    description: "A description",
    date: "2012-12-26",
    category: "💪 Health",
  });

  const entry = await logLifeEvent();

  const expected: Entry = {
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

  const expected: Entry = {
    title: "Major life change",
    type: "life",
    description: "A description",
    date: "2012-12-26",
    category: "🦕 Deno",
  };

  assertEquals(entry, expected);
});
