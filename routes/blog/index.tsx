import { Handlers, PageProps } from "$fresh/server.ts";
import { PostList } from "../../components/PostList.tsx";
import { getSection } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";
import { groupBy } from "../../src/group_by.ts";

interface BlogProps {
  posts: Post[];
}

export const handler: Handlers<BlogProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const blog = await getSection("blog");
    const posts = blog.pages as Post[];
    ctx.state.title = `${blog.title} - ${ctx.state.title}`;
    if (blog.description) {
      ctx.state.description = blog.description;
    }
    ctx.state.breadcrumbs = [
      {
        title: "Index",
        path: "/",
      },
      {
        title: "Blog",
        path: url.pathname,
        current: true,
      },
    ];

    return ctx.render({ ...ctx.state, posts });
  },
};

export default function BlogIndex({ data }: PageProps<BlogProps>) {
  const { posts } = data;
  const groupedPosts = groupBy(posts, (post) => post.date.getFullYear());

  return (
    <div class="max-w-screen-md mx-auto px-4 prose">
      <h1 class="text-4xl font-semibold mb-4">Blog</h1>
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
