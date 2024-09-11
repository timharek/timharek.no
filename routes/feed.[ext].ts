import { Handlers } from "$fresh/server.ts";
import { config } from "../config.ts";
import { getSection } from "../src/content.ts";
import { stringify } from "@libs/xml";
import { getReplyToHTMLString, jsonResponse } from "../src/utils.ts";
import { z } from "zod";

const availableExtension = z.enum(["xml", "atom", "json"]);

export const handler: Handlers = {
  async GET(_req, ctx) {
    try {
      const extension = availableExtension.parse(ctx.params.ext);
      const posts = (await getSection("blog")).pages as Post[];
      const POST_COUNT = 15;

      const latestPosts = posts.slice(0, POST_COUNT);

      if (extension !== "json") {
        const atomFeed = generateXML(latestPosts);
        return new Response(atomFeed, {
          headers: { "content-type": "text/xml; charset=utf-8" },
        });
      }

      const jsonFeed = generateJsonFeed(latestPosts);
      return jsonResponse(jsonFeed);
    } catch (error) {
      console.error(error);
      return ctx.renderNotFound();
    }
  },
};

function contentFooter(post: Post) {
  return `<hr>
<p>Thank you for keeping RSS alive!</p>
${getReplyToHTMLString(config.author.email, post.title)}`;
}

function generateXML(posts: Post[]): string {
  const entries = posts.map((post) => {
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
        "#text": post.html + contentFooter(post),
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

type Author = {
  name?: string;
  url?: URL;
  avatar?: URL;
};
type Item = {
  title: string;
  id: string;
  url: URL;
  content_html: string;
  summary?: string;
  image?: URL;
  banner_image?: URL;
  date_published: Date;
  date_modified?: Date;
  authors?: Author[];
  tags?: string[];
  language?: string;
};
type Attachment = {
  url: URL;
  mime_type: string;
  title?: string;
  size_in_bytes?: number;
  duration_in_seconds?: number;
};
type JSONFeed = {
  version: "https://jsonfeed.org/version/1.1";
  user_comment: string;
  title: string;
  icon?: URL;
  favicon?: URL;
  description?: string;
  home_page_url?: URL;
  feed_url?: URL;
  authors?: Author[];
  language?: string;
  expired?: boolean;
  items: Item[];
  attachments?: Attachment[];
};

function generateJsonFeed(posts: Post[]): JSONFeed {
  return {
    version: "https://jsonfeed.org/version/1.1",
    user_comment:
      `This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format. To add this feed to your reader, copy the following URL — ${config.base_url}/feed.json — and add it your reader.`,
    title: config.title,
    description: config.description,
    home_page_url: new URL(config.base_url),
    feed_url: new URL(`${config.base_url}/feed.json`),
    authors: [{
      name: config.author.name,
      url: new URL(config.base_url),
      avatar: new URL(`${config.base_url}${config.author.avatar}`),
    }],
    items: posts.map((post) => {
      return {
        title: post.title,
        id: post.path,
        url: new URL(`${config.base_url}/${post.path}`),
        date_published: post.createdAt,
        ...(post.updatedAt && { date_modified: post.updatedAt }),
        content_html: `${post.html} ${contentFooter(post)}`,
        ...(post.tags.length > 0 &&
          { tags: post.tags.map((tag) => tag.title) }),
      };
    }),
  };
}
