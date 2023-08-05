import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { css, getBlogPost, slugify } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";

interface BlogPostProps {
  post: Post;
}

export const handler: Handlers<BlogPostProps, ServerState> = {
  async GET(req, ctx) {
    const slug = ctx.params.slug;

    const post = await getBlogPost(slug);

    if (!post) {
      return ctx.renderNotFound();
    }

    const url = new URL(req.url);
    ctx.state.title = `${post.title} - ${ctx.state.title}`;
    ctx.state.breadcrumbs = [
      {
        title: "Index",
        path: "/",
      },
      {
        title: "Blog",
        path: "/blog",
      },
      {
        title: post.title,
        path: url.pathname,
        current: true,
      },
    ];

    const resp = ctx.render({ ...ctx.state, post });
    return resp;
  },
};

export default function BlogPost({ data }: PageProps<BlogPostProps>) {
  const { post } = data;
  const body = render(post.content);
  const title = post.title;

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 mb-4"
      >
        <h1 class="text-4xl font-semibold mb-4">{title}</h1>
        <div class="markdown-body" dangerouslySetInnerHTML={{ __html: body }}>
        </div>
        <ul>
          {post.taxonomies &&
            post.taxonomies.tags.map((tag) => (
              <li>
                <a href={`/tags/${slugify(tag)}`}>
                  {tag}
                </a>
              </li>
            ))}
        </ul>
      </article>
    </>
  );
}
