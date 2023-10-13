import { Handlers, PageProps } from "$fresh/server.ts";
import { PageHeader } from "../../components/PageHeader.tsx";
import { PostList } from "../../components/PostList.tsx";
import { getPostsByTag, getTag } from "../../src/content.ts";
import { groupBy } from "../../src/group_by.ts";
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
      },
    ];
    ctx.state.description = `Posts tagged with ${tag.title}.`;

    return ctx.render({ tag, posts });
  },
};

export default function TagPage({ data }: PageProps<TagPageProps>) {
  const { tag, posts } = data;
  const groupedPosts = groupBy(posts, (post) => post.date.getFullYear());

  return (
    <div class="max-w-screen-md mx-auto px-4 prose">
      <PageHeader title={tag.title} />
      {Object.keys(groupedPosts).sort((a, b) => b.localeCompare(a)).map((
        year,
      ) => (
        <div class="">
          <div class="flex items-center gap-2 sticky top-0 bg-bg">
            <h3 class="text-2xl font-semibold my-4">{year}</h3>
            <p class="">({groupedPosts[year].length} posts)</p>
          </div>
          <PostList posts={groupedPosts[year]} />
        </div>
      ))}
    </div>
  );
}
