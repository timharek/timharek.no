import { Handlers } from "$fresh/server.ts";
import { config } from "../../config.ts";
import { getSection } from "../../src/content.ts";
import { getReplyToHTMLString } from "../../src/utils.ts";

export const handler: Handlers = {
  async GET(_req, _ctx) {
    const posts = (await getSection("blog")).pages as Post[];
    const POST_COUNT = 15;

    const feed = generateJsonFeed(posts.slice(0, POST_COUNT));

    return new Response(JSON.stringify(feed, null, 2), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  },
};

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
      `"This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format. To add this feed to your reader, copy the following URL — ${config.base_url}/feed.json — and add it your reader."`,
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
        content_html: `${post.html} ${
          getReplyToHTMLString(config.author.email, post.title)
        }`,
        ...(post.tags.length > 0 &&
          { tags: post.tags.map((tag) => tag.title) }),
      };
    }),
  };
}
