import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getTag } from "../../src/utils.ts";

interface TagPageProps {
  title: string;
}

export const handler: Handlers<TagPageProps, unknown> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;

    const tag = await getTag(slug);

    if (!tag) {
      return ctx.renderNotFound();
    }

    return ctx.render(tag);
  },
};

export default function TagPage({ data }: PageProps<TagPageProps>) {
  const { title } = data;

  return (
    <>
      <Head>
        <title>{title} - Tags - Tim Hårek</title>
      </Head>
      <main>
        <h1>{title}</h1>
      </main>
    </>
  );
}
