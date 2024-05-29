import { assertEquals } from "@std/assert";
import { getAllLinks } from "./content_links.ts";

Deno.test("Get all links", async () => {
  const prefix = "./testdata/markdown/content";

  const links = await getAllLinks(prefix);

  assertEquals(links?.count, 2);
  assertEquals(links?.internal?.length, 1);
  assertEquals(links?.external?.length, 1);
});
