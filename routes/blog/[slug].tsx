import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { render } from "gfm/mod.ts";
import { css, getBlogPost, slugify } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { config } from "../../config.ts";

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
        <PageHeader title={title} date={post.date} updated={post.updated} />
        <div class="markdown-body" dangerouslySetInnerHTML={{ __html: body }}>
        </div>
        <Metadata tags={post.taxonomies?.tags} postTitle={title} />
      </article>
    </>
  );
}

interface MetadataProps {
  tags?: string[];
  postTitle: string;
}

function Metadata({ tags, postTitle }: MetadataProps) {
  return (
    <div class="border-y-2 border-primary py-4 mt-4 flex flex-wrap gap-4 justify-between items-center">
      <div class="">
        <div class="flex gap-2">
          <h2>Tagged with</h2>
          {tags && (
            <ul class="flex gap-1">
              {tags.sort((a, b) => a.localeCompare(b)).map((tag) => (
                <li>
                  <a
                    class="text-primary hover:underline"
                    href={`/tags/${slugify(tag)}`}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div class="">(count) words</div>
      </div>
      <a
        class="border border-primary px-3 py-2 rounded-lg text-(primary hover:black) bg-(hover:primary) transition-all duration-150"
        href={`mailto:${config.email}?subject=RE: ${postTitle}`}
      >
        Reply via email
      </a>
    </div>
  );
}
