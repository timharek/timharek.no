import { Handlers, PageProps } from "$fresh/server.ts";
import { getAllTags } from "../../src/utils.ts";
import { ServerState } from "../_middleware.ts";

interface TagsProps {
  tags: Tag[];
}

export const handler: Handlers<TagsProps, ServerState> = {
  async GET(_req, ctx) {
    const tags = await getAllTags();
    ctx.state.title = `Tags - ${ctx.state.title}`;

    return ctx.render({ ...ctx.state, tags });
  },
};

export default function TagsIndex({ data }: PageProps<TagsProps>) {
  const { tags } = data;
  return (
    <article class="max-w-screen-md mx-auto px-4 prose">
      <h1>Tags</h1>
      <ul class="">
        {tags.map((tag) => (
          <li class="">
            <a href={tag.path}>{tag.title}</a>
          </li>
        ))}
      </ul>
    </article>
  );
}
