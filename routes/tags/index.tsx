import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { config } from "../../config.ts";
import { getAllTags } from "../../src/utils.ts";

interface TagsProps {
  tags: Tag[];
}

export const handler: Handlers<TagsProps, unknown> = {
  async GET(_req, ctx) {
    const tags = await getAllTags();

    return ctx.render(
      {
        tags,
      },
    );
  },
};

export default function TagsIndex({ data }: PageProps<TagsProps>) {
  const { tags } = data;
  return (
    <>
      <Head>
        <title>Tags - {config.title}</title>
      </Head>
      <article class="max-w-screen-md mx-auto px-4 prose">
        <h1>Tags</h1>
        <ul class="">
          {tags.map((post) => (
            <li class="">
              <a href={post.path}>{post.title}</a>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
