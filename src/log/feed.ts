import {
  DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";
import { getDomain, parse } from "https://esm.sh/tldts@6.0.14";

interface Feed {
  title: string;
  description?: string | null;
  tags?: string[];
  domain: string;
  rss: string;
  color: {
    bg: string;
    text: string;
  };
}

export async function fetchFeed(url: string): Promise<Feed> {
  const parsed = parse(url);
  let urlToFetch = url;

  if (!parsed.isIp) {
    const domain = getDomain(url);
    urlToFetch = `https://${domain}`;
  }

  const response = await (await fetch(urlToFetch)).text();

  const dom = new DOMParser().parseFromString(response, "text/html");
  if (!dom) {
    throw new Error("Empty DOM");
  }
  const title = dom.querySelector("title")?.innerText;

  if (!title) {
    throw new Error("Missing title");
  }

  const description = dom.querySelector('meta[name="description"]')
    ?.getAttribute(
      "content",
    );

  let rss = dom.querySelector('link[type="application/json"]');

  if (!rss) {
    rss = dom.querySelector('link[type="application/rss+xml"]');
  }
  if (!rss) {
    throw new Error("Missing RSS");
  }

  let rssHref = rss.getAttribute("href");
  if (!rssHref) {
    throw new Error("Missing RSS");
  }

  if (!rssHref.includes(url)) {
    rssHref = `${url}${rssHref}`;
  }

  const obj = {
    title,
    description,
    tags: [],
    domain: url,
    rss: rssHref,
    color: {
      bg: "",
      text: "",
    },
  };

  return obj;
}

async function writeNewFeedToFile(feed: Feed) {
  const path = new URL("../../static/api/blogroll.json", import.meta.url);
  const json: Feed[] = JSON.parse(await Deno.readTextFile(path));
  json.push(feed);
  await Deno.writeTextFile(path, JSON.stringify(json, null, 2));
}

if (import.meta.main) {
  const url = Deno.args[0];
  const feed = await fetchFeed(url);

  await writeNewFeedToFile(feed);
}
