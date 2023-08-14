import { Handlers, PageProps } from "$fresh/server.ts";
import { PostList } from "../components/PostList.tsx";
import { getAllBlogPosts } from "../src/markdown.ts";
import { ServerState } from "./_middleware.ts";

interface HomeProps {
  posts: Post[];
}

export const handler: Handlers<HomeProps, ServerState> = {
  async GET(_req, ctx) {
    const posts = await getAllBlogPosts();

    return ctx.render({ ...ctx.state, posts: posts.slice(0, 5) });
  },
};
export default function Home({ data }: PageProps<HomeProps>) {
  const { posts } = data;
  return (
    <div class="p-4 mx-auto max-w-screen-md space-y-4 md:space-y-8">
      <section class="space-y-4 md:space-y-4">
        <h1 class="text-4xl font-semibold">Hi, I'm Tim Hårek 👋</h1>
        <p class="max-w-prose">
          I'm a technologist from Norway. I care about creating solutions that
          respects people in terms of privacy, security and user experience.
          This is my corner on the interwebs, have a look around.
        </p>
      </section>
      <section class="space-y-4 md:space-y-4">
        <h2 class="text-3xl font-semibold">Latest posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
