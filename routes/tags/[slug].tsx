import { Handlers, PageProps } from "$fresh/server.ts";
import { getTag } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";

interface TagPageProps {
  tag: Tag;
}

export const handler: Handlers<TagPageProps, ServerState> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    const tag = await getTag(slug);

    if (!tag) {
      return ctx.renderNotFound();
    }
    ctx.state.title = `Tags: ${tag.title} - ${ctx.state.title}`;
    console.log("title", ctx.state.title);

    return ctx.render({ ...ctx.state, tag });
  },
};

export default function TagPage({ data }: PageProps<TagPageProps>) {
  const { tag } = data;

  return (
    <div class="max-w-screen-md mx-auto px-4 prose">
      <h1>{tag.title}</h1>
    </div>
  );
}
