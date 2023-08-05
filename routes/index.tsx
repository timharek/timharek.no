import { Handlers, PageProps } from "$fresh/server.ts";
import { PostList } from "../components/PostList.tsx";
import { getAllBlogPosts } from "../src/utils.ts";
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
  const todo = [
    "Add garden",
    "Add proper logs pages",
    "Add sitemap (not xml)",
    "Add tests",
    "Move scripts",
    "Git integration?",
    "Swap shortcodes with proper Markdown",
    "Move CV",
    "Move uses",
    "Extract redirects",
    "Clean up `utils.ts`",
  ];
  return (
    <div class="p-4 mx-auto max-w-screen-md space-y-4 md:space-y-8">
      <section class="space-y-4 md:space-y-4">
        <h1 class="text-4xl font-semibold">Hi, I'm Tim Hårek 👋</h1>
        <p class="max-w-prose">
          I'm a technologist from Norway. I care about creating solutions that
          respects people in terms of privacy, security and user experience.
          This is my corner on the interwebs, have a look around.
        </p>
        <h2 class="text-3xl">TODO</h2>
        <ul class="list-disc pl-4">
          {todo.map((todo) => <li>{todo}</li>)}
        </ul>
      </section>
      <section class="space-y-4 md:space-y-4">
        <h2 class="text-3xl font-semibold">Latest posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
