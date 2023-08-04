import { Handlers, PageProps } from "$fresh/server.ts";
import { getBlogPostsByTag, getTag } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";

interface TagPageProps {
  tag: Tag;
  posts: Post[];
}

export const handler: Handlers<TagPageProps, ServerState> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    const tag = await getTag(slug);

    if (!tag) {
      return ctx.renderNotFound();
    }

    const posts = await getBlogPostsByTag(tag?.title);

    if (!posts) {
      return ctx.renderNotFound();
    }

    ctx.state.title = `Tags: ${tag.title} - ${ctx.state.title}`;
    console.log("title", ctx.state.title);

    return ctx.render({ ...ctx.state, tag, posts });
  },
};

export default function TagPage({ data }: PageProps<TagPageProps>) {
  const { tag, posts } = data;

  return (
    <div class="max-w-screen-md mx-auto px-4 prose">
      <h1>{tag.title}</h1>
      <ul class="">
        {posts.map((post) => (
          <li class="">
            <a href={post.path}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
