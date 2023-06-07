import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from "../../config.ts";
import { getAllBlogPosts } from "../../src/utils.ts";

interface BlogProps {
  posts: Post[];
}

export const handler: Handlers = {
  async GET(_req, ctx) {
    const posts = await getAllBlogPosts();

    return ctx.render(
      {
        posts,
      } as BlogProps,
    );
  },
};

export default function BlogIndex({ data }: PageProps<BlogProps>) {
  const { posts } = data;
  return (
    <>
      <Head>
        <title>Blog - {config.title}</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4 prose">
        <h1>Blog</h1>
        <ul class="">
          {posts.map((post) => (
            <li class="">
              <a href={post.path}>{post.title}</a>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
