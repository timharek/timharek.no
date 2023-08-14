import { Handlers } from "$fresh/server.ts";
import { sanitizeHtml } from "gfm/deps.ts";
import { config } from "../../config.ts";
import { getAllBlogPosts } from "../../src/markdown.ts";
import { ServerState } from "../_middleware.ts";
import { render } from "gfm/mod.ts";
export { default as sanitizeHtml } from "https://esm.sh/sanitize-html@2.8.1?target=esnext";
import { escapeHtml } from "https://deno.land/x/escape_html@1.0.0/mod.ts";

interface RSSProps {
  posts: Post[];
}

export const handler: Handlers<RSSProps, ServerState> = {
  async GET(_req, _ctx) {
    const posts = await getAllBlogPosts();
    const POST_COUNT = 15;

    const rss = generateRssFeed(posts.slice(0, POST_COUNT));

    return new Response(rss, { headers: { "content-type": "text/xml" } });
  },
};

function generateRssFeed(posts: Post[]): string {
  const postsRss = posts.map((post) => {
    const tags = post.taxonomies?.tags.map((tag) => {
      return `<category term="${sanitizeHtml(tag)}" />`;
    }).filter((tag) => tag !== undefined);

    const content = escapeHtml(`${render(post.content).toString()}
${
      sanitizeHtml(
        `<a href="mailto:${config.email}?subject=${post.title}">Reply via e-mail</a>`,
      ).toString()
    }`);
    console.log(content);
    return `<entry xml:lang="en">
	<title>${sanitizeHtml(post.title)}</title>
	<author>
		<name>${config.author}</name>
		<email>${config.email}</email>
		<uri>${config.base_url}</uri>
		</author>
	<published>${post.date.toISOString()}</published>
	<updated>${
      post.updated ? post.updated.toISOString() : post.date.toISOString()
    }</updated>
	<link rel="alternate" href="${config.base_url}${post.path}" type="text/html"/>
	<id>${config.base_url}/${post.path}</id>
    ${tags ? tags.join("\n\t") : ""}
    <content type="html">
      ${content}
    </content>
</entry>`;
  });

  const feedUrl = `${config.base_url}/rss.xml`;
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en">
	<title>${config.title}</title>
	<subtitle>${config.description}</subtitle>
	<link href="${feedUrl}" rel="self" type="application/atom+xml"/>
  <link href="${config.base_url}"/>
	<updated>${
    posts[0].updated
      ? posts[0].updated.toISOString()
      : posts[0].date.toISOString()
  }</updated>
	<id>${feedUrl}</id>
	${postsRss.join("\n")}
</feed>
  `;

  return rss;
}
