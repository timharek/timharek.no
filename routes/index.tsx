import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from "../config.ts";
import { getAllBlogPosts } from "../src/utils.ts";

interface HomeProps {
  posts: Post[];
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const posts = await getAllBlogPosts();

    return ctx.render(
      {
        posts: posts.slice(0, 5),
      } as HomeProps,
    );
  },
};
export default function Home({ data }: PageProps<HomeProps>) {
  const { posts } = data;
  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md space-y-4 md:space-y-8">
        <section class="space-y-4 md:space-y-8">
          <h1 class="text-4xl font-semibold">Hi, I'm Tim Hårek 👋</h1>
          <p class="max-w-prose">
            I'm a technologist from Norway. I care about creating solutions that
            respects people in terms of privacy, security and user experience.
            This is my corner on the interwebs, have a look around.
          </p>
        </section>
        <section class="space-y-4 md:space-y-8">
          <h2 class="text-3xl font-semibold">Latest posts</h2>
          <ul>
            {posts.map((post) => (
              <li class="">
                <a href={post.path}>{post.title}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
