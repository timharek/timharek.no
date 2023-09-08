import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPost } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { config } from "../../config.ts";
import { Link } from "../../components/Link.tsx";
import { Icon } from "../../components/Icons.tsx";
import { css } from "../../src/markdown.ts";

interface BlogPostProps {
  post: Post;
}

export const handler: Handlers<BlogPostProps, ServerState> = {
  async GET(req, ctx) {
    const slug = ctx.params.slug;

    const post = await getPost(slug);

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

    const resp = ctx.render({ post });
    return resp;
  },
};

export default function BlogPost({ data }: PageProps<BlogPostProps>) {
  const { post } = data;
  const title = post.title;

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </Head>
      <article
        data-color-mode="dark"
        data-dark-theme="dark"
        class="max-w-screen-md mx-auto px-4 mb-4 h-entry"
      >
        <PageHeader
          title={title}
          date={post.date}
          updated={post.updated}
          readingTime={post.readingTime}
        />
        <div
          class="markdown-body e-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        >
        </div>
        <Metadata
          tags={post.taxonomies?.tags}
          postTitle={title}
          wordCount={post.wordCount}
        />
      </article>
    </>
  );
}

interface MetadataProps {
  tags?: Tag[];
  postTitle: string;
  wordCount: number;
}

function Metadata({ tags, postTitle, wordCount }: MetadataProps) {
  return (
    <div class="border-y-2 border-primary py-4 mt-4 flex flex-wrap gap-4 justify-between items-center">
      <div class="space-y-4">
        <div class="flex gap-2 flex-wrap">
          {tags && (
            <>
              <div class="flex gap-2">
                {tags?.length > 1 ? <Icon.Tags /> : <Icon.Tag />}
                <h2>Tagged with</h2>
              </div>
              <ul class="flex gap-1 flex-wrap">
                {tags.sort((a, b) => a.title.localeCompare(b.title)).map((
                  tag,
                ) => (
                  <li>
                    <Link
                      href={`/${tag.path}`}
                      label={`#${tag.slug}`}
                      className="p-category"
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div class="flex gap-2">
          <Icon.Script />
          <h2>{wordCount} words</h2>
        </div>
      </div>
      <a
        class="print:hidden border border-primary px-3 py-2 rounded-lg text-(primary hover:black) bg-(hover:primary) transition-all duration-150"
        href={`mailto:${config.author.email}?subject=RE: ${postTitle}`}
      >
        <span class="flex gap-2">
          <Icon.Mail />
          Reply via email
        </span>
      </a>
    </div>
  );
}
