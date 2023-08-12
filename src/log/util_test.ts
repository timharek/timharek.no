// @deno-types="./mod.d.ts"

import { assertEquals } from "$std/testing/asserts.ts";
import { getEntryDate } from "./util.ts";

Deno.test("Format date", () => {
  const inputDate = "2012-12-26";
  const entryDate = getEntryDate(inputDate);

  const expected: Log.IDate = {
    day: "26",
    month: "12",
    year: "2012",
    string: inputDate,
  };

  assertEquals(entryDate, expected);
});
