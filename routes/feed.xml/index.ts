import { Handlers } from "$fresh/server.ts";
import { config } from "../../config.ts";
import { getSection } from "../../src/content.ts";
import { stringify } from "@libs/xml";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = (await getSection("blog")).pages as Post[];
    const POST_COUNT = 15;

    const rss = generateXML(posts.slice(0, POST_COUNT));

    return new Response(rss, {
      headers: { "content-type": "text/xml; charset=utf-8" },
    });
  },
};

function generateXML(posts: Post[]): string {
  const entries = posts.map((post) => {
    const contentFooter =
      `<a href="mailto:${config.author.email}?subject=RE:${post.title}">Reply via e-mail</a>`;
    return {
      "@xml:lang": "en",
      title: post.title,
      author: {
        name: config.author.name,
        email: config.author.email,
        uri: config.base_url,
      },
      published: post.createdAt.toISOString(),
      updated: post.updatedAt
        ? post.updatedAt?.toISOString()
        : post.createdAt.toISOString(),
      link: {
        "@rel": "alternate",
        "@href": `${config.base_url}/${post.path}`,
        "@type": "text/html",
      },
      id: `${config.base_url}/${post.path}`,
      category: post.tags.map((tag) => ({ "@term": tag.title })),
      content: {
        "@type": "html",
        "#text": post.html + contentFooter,
      },
    };
  });
  const feedUrl = `${config.base_url}/feed.xml`;
  const feedXML = stringify({
    feed: {
      "@xmlns": "http://www.w3.org/2005/Atom",
      "@xml:lang": "en",
      title: config.title,
      subtitle: config.description,
      link: [
        {
          "@href": feedUrl,
          "@rel": "self",
          "@type": "application/atom+xml",
        },
        {
          "@href": feedUrl.replace("xml", "json"),
          "@rel": "alternate",
          "@type": "application/json",
        },
        {
          "@href": config.base_url,
        },
      ],
      updated: posts[0].updatedAt
        ? posts[0].updatedAt.toISOString()
        : posts[0].createdAt.toISOString(),
      id: feedUrl,
      entry: entries,
    },
  });

  return feedXML;
}
