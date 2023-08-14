import { Handlers, PageProps } from "$fresh/server.ts";
import { Link } from "../../components/Link.tsx";
import { getAllTags } from "../../src/markdown.ts";
import { ServerState } from "../_middleware.ts";

interface TagsProps {
  tags: Tag[];
}

export const handler: Handlers<TagsProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const tags = await getAllTags();
    ctx.state.title = `Tags - ${ctx.state.title}`;
    ctx.state.breadcrumbs = [
      {
        title: "Index",
        path: "/",
      },
      {
        title: "Tags",
        path: url.pathname,
        current: true,
      },
    ];

    return ctx.render({ ...ctx.state, tags });
  },
};

export default function TagsIndex({ data }: PageProps<TagsProps>) {
  const { tags } = data;
  return (
    <article class="max-w-screen-md mx-auto px-4 prose">
      <h1>Tags</h1>
      <ul class="columns-2 list-disc pl-4">
        {tags.map((tag) => (
          <li class="">
            <Link href={tag.path} label={tag.title} />
          </li>
        ))}
      </ul>
    </article>
  );
}
