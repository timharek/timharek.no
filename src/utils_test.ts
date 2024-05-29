import { assertEquals } from "@std/assert";
import {
  getReadingTime,
  getRelativeTime,
  getWordCount,
  slugify,
} from "./utils.ts";

Deno.test("Get word count from Markdown", () => {
  const input = `
As of July 25th The Browser Company announced that Arc 1.0 is available for
everyone! I saw the ad as a recommended video on YouTube and went to Homebrew to
see if it was available there.

To my surprise, it was available and I've been eager to try out the new browser,
but I didn't want to sign up for any waitlist, so I waited instead.

When I opened Arc for the first (and only) time, I was greeted with a sign up
form. Why do I need to sign up to browse the internet?

<figure>
  <img
    src="/img/blog/2023-08-01-arc-browser-account/arc-screenshot.png"
    alt="Screentshot of Arc browser after first time opening.">
  <figcaption>
    What I was greeted with after opening the Arc browser for the first time.
  </figcaption>
</figure>

The form even says:

> TL;DR: We don't spy on you!

How comforting. Why do I need an account anyway? It says that they want me to
sign up so that I can access all features like syncing across devices etc. But
what about just being able to try the thing out? Why can't I do that?

Even Google lets you use Google Chrome without signing up/in – I think that this
is just an excuse to track people and/or have a way to do analytics.

Signing in to a browser should be opt-in, and not be forced.
`;
  const wordCount = getWordCount(input);
  assertEquals(wordCount, 221);
});

Deno.test("Get reading time from Markdown", () => {
  const input = `
As of July 25th The Browser Company announced that Arc 1.0 is available for
everyone! I saw the ad as a recommended video on YouTube and went to Homebrew to
see if it was available there.

To my surprise, it was available and I've been eager to try out the new browser,
but I didn't want to sign up for any waitlist, so I waited instead.

When I opened Arc for the first (and only) time, I was greeted with a sign up
form. Why do I need to sign up to browse the internet?

<figure>
  <img
    src="/img/blog/2023-08-01-arc-browser-account/arc-screenshot.png"
    alt="Screentshot of Arc browser after first time opening.">
  <figcaption>
    What I was greeted with after opening the Arc browser for the first time.
  </figcaption>
</figure>

The form even says:

> TL;DR: We don't spy on you!

How comforting. Why do I need an account anyway? It says that they want me to
sign up so that I can access all features like syncing across devices etc. But
what about just being able to try the thing out? Why can't I do that?

Even Google lets you use Google Chrome without signing up/in – I think that this
is just an excuse to track people and/or have a way to do analytics.

Signing in to a browser should be opt-in, and not be forced.
`;

  const wordCount = getReadingTime(input);
  assertEquals(wordCount, 1);
});

Deno.test("Get relative time format for 2023-08-15 vs 2023-08-16", () => {
  const initialDate = new Date("2023-08-15");
  const comparisonDate = new Date("2023-08-16");

  const relativeTime = getRelativeTime(comparisonDate, initialDate);
  assertEquals(relativeTime, "1 day ago");
});

Deno.test("Get relative time format for 2023-08-16T10:00:00 vs 2023-08-16T12:00:00", () => {
  const initialDate = new Date("2023-08-16T10:00:00");
  const comparisonDate = new Date("2023-08-16T12:00:00");

  const relativeTime = getRelativeTime(comparisonDate, initialDate);
  assertEquals(relativeTime, "2 hours ago");
});

Deno.test("Slugify 'Deno Fresh' to 'deno-fresh'", () => {
  const result = slugify("Deno Fresh");

  assertEquals(result, "deno-fresh");
});

Deno.test("Slugify 'VPN' to 'vpn'", () => {
  const result = slugify("VPN");

  assertEquals(result, "vpn");
});
