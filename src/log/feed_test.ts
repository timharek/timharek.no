import { assertEquals } from "$std/testing/asserts.ts";
import { fetchFeed } from "./feed.ts";

Deno.test("Fetch feed for timharek.no", async () => {
  const feed = await fetchFeed("https://timharek.no");

  assertEquals(feed.title, "Tim Hårek");
  assertEquals(feed.rss, "https://timharek.no/feed.json");
});
