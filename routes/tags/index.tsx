import { Handlers, PageProps } from "$fresh/server.ts";
import { Link } from "../../components/Link.tsx";
import { PageHeader } from "../../components/PageHeader.tsx";
import { getAllTags, getPostsByTag } from "../../src/content.ts";
import { ServerState } from "../_middleware.ts";

interface TagWithCount extends Tag {
  count: number;
}
interface TagsProps {
  tags: TagWithCount[];
}

export const handler: Handlers<TagsProps, ServerState> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const tagsWithoutCount = await getAllTags();
    ctx.state.title = `Tags - ${ctx.state.title}`;
    ctx.state.breadcrumbs = [
      {
        title: "Home",
        path: "/",
      },
      {
        title: "Tags",
        path: url.pathname,
      },
    ];

    const tags: TagWithCount[] = await Promise.all(
      tagsWithoutCount.map(async (tag) => {
        return {
          ...tag,
          count: await getTagPostCount(tag.slug),
        };
      }),
    );

    return ctx.render({ tags });
  },
};

export default function TagsIndex({ data }: PageProps<TagsProps>) {
  const { tags } = data;
  return (
    <article class="max-w-screen-md mx-auto px-4">
      <PageHeader title="Tags" />
      <ul class="columns-2 list-disc pl-4">
        {tags.map((tag) => (
          <li class="">
            <Link href={tag.path} label={`${tag.title} (${tag.count})`} />
          </li>
        ))}
      </ul>
    </article>
  );
}

async function getTagPostCount(tagSlug: string): Promise<number> {
  const posts = await getPostsByTag(tagSlug);
  if (!posts) {
    return 0;
  }

  return posts.length;
}
