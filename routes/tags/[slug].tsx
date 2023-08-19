import { Handlers, PageProps } from "$fresh/server.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { PostList } from "../../components/PostList.tsx";
import { getPostsByTag, getTag } from "../../src/markdown.ts";
import { ServerState } from "../_middleware.ts";

interface TagPageProps {
  tag: Tag;
  posts: Post[];
}

export const handler: Handlers<TagPageProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const slug = ctx.params.slug;

    const tag = await getTag(slug);

    if (!tag) {
      return ctx.renderNotFound();
    }

    const posts = await getPostsByTag(tag.slug);

    if (!posts) {
      return ctx.renderNotFound();
    }

    ctx.state.title = `Tags: ${tag.title} - ${ctx.state.title}`;
    ctx.state.breadcrumbs = [
      {
        title: "Index",
        path: "/",
      },
      {
        title: "Tags",
        path: "/tags",
      },
      {
        title: tag.title,
        path: url.pathname,
        current: true,
      },
    ];
    ctx.state.description = `Posts tagged with ${tag.title}.`;

    return ctx.render({ ...ctx.state, tag, posts });
  },
};

export default function TagPage({ data }: PageProps<TagPageProps>) {
  const { tag, posts } = data;

  return (
    <div class="max-w-screen-md mx-auto px-4 prose">
      <PageHeader title={tag.title} />
      <PostList posts={posts} />
    </div>
  );
}
